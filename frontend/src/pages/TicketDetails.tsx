import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ticketService } from '../services/ticket.service'
import { TicketDetail } from '../types'
import { useAuthStore } from '../store/useAuthStore'
import { FileUpload, AttachmentList } from '../components/FileUpload'
import { 
  priorityColors, 
  priorityLabels, 
  statusColors, 
  statusLabels, 
  categoryLabels 
} from '../utils/ticketHelpers'

export const TicketDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [ticket, setTicket] = useState<TicketDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [commentMessage, setCommentMessage] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [commentError, setCommentError] = useState<string | null>(null)
  const [isUploadingFile, setIsUploadingFile] = useState(false)

  useEffect(() => {
    loadTicket()
  }, [id])

  const loadTicket = async () => {
    if (!id) return

    try {
      setIsLoading(true)
      setError(null)
      const data = await ticketService.getById(id)
      setTicket(data)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar ticket')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const canEdit = () => {
    if (!ticket || !user) return false
    return (
      user.role === 'ADMIN' ||
      user.role === 'ATTENDANT' ||
      (user.id === ticket.createdById && ticket.status === 'OPEN')
    )
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id || !commentMessage.trim()) return

    try {
      setIsSubmittingComment(true)
      setCommentError(null)
      await ticketService.addComment(id, commentMessage.trim())
      setCommentMessage('')
      await loadTicket() // Recarrega ticket com novo comentário
    } catch (err: any) {
      setCommentError(err.response?.data?.error || 'Erro ao adicionar comentário')
    } finally {
      setIsSubmittingComment(false)
    }
  }

  const handleUploadFile = async (file: File) => {
    if (!id) return

    try {
      setIsUploadingFile(true)
      await ticketService.uploadAttachment(id, file)
      await loadTicket() // Recarrega ticket com novo anexo
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Erro ao enviar arquivo')
    } finally {
      setIsUploadingFile(false)
    }
  }

  const handleDownloadAttachment = async (filename: string) => {
    if (!id) return
    try {
      await ticketService.downloadAttachment(id, filename)
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao baixar arquivo')
    }
  }

  const handleDeleteAttachment = async (filename: string) => {
    if (!id) return
    if (!window.confirm('Tem certeza que deseja remover este anexo?')) return

    try {
      await ticketService.deleteAttachment(id, filename)
      await loadTicket() // Recarrega ticket sem o anexo
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao remover anexo')
    }
  }

  const canManageAttachments = () => {
    if (!ticket || !user) return false
    return (
      user.role === 'ADMIN' ||
      user.role === 'ATTENDANT' ||
      user.id === ticket.createdById
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Carregando ticket...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error || 'Ticket não encontrado'}
          </div>
          <button
            onClick={() => navigate('/tickets')}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            ← Voltar para lista
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/tickets')}
            className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
          >
            ← Voltar para lista
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Chamado #{ticket.id}</h1>
              <p className="text-gray-600 mt-1">{ticket.title}</p>
            </div>
            {canEdit() && (
              <button
                onClick={() => navigate(`/tickets/${ticket.id}/edit`)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Editar
              </button>
            )}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* Status and Priority */}
          <div className="flex gap-4 mb-6">
            <div>
              <span className="text-sm text-gray-500 block mb-1">Status</span>
              <span
                className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                  statusColors[ticket.status]
                }`}
              >
                {statusLabels[ticket.status]}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500 block mb-1">Prioridade</span>
              <span
                className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                  priorityColors[ticket.priority]
                }`}
              >
                {priorityLabels[ticket.priority]}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500 block mb-1">Categoria</span>
              <span className="px-3 py-1 inline-flex text-sm font-semibold rounded-full bg-gray-100 text-gray-800">
                {categoryLabels[ticket.category]}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Criado por</h3>
              <p className="text-gray-900">{ticket.createdBy.name}</p>
              <p className="text-sm text-gray-500">{ticket.createdBy.email}</p>
              <p className="text-xs text-gray-400 mt-1">{formatDate(ticket.createdAt)}</p>
            </div>

            {ticket.assignedTo && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Atribuído para</h3>
                <p className="text-gray-900">{ticket.assignedTo.name}</p>
                <p className="text-sm text-gray-500">{ticket.assignedTo.email}</p>
              </div>
            )}

            {!ticket.assignedTo && (user?.role === 'ATTENDANT' || user?.role === 'ADMIN') && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Atribuído para</h3>
                <p className="text-sm text-gray-400 italic">Nenhum atendente atribuído</p>
              </div>
            )}
          </div>

          {ticket.updatedAt !== ticket.createdAt && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-400">
                Última atualização: {formatDate(ticket.updatedAt)}
              </p>
            </div>
          )}
        </div>

        {/* Attachments Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Anexos ({ticket.attachments?.length || 0})
          </h2>

          {/* Upload Area */}
          {canManageAttachments() && (
            <div className="mb-6">
              <FileUpload 
                onUpload={handleUploadFile}
                isUploading={isUploadingFile}
              />
            </div>
          )}

          {/* Attachments List */}
          <AttachmentList
            attachments={(ticket.attachments || []).map(filename => ({ filename }))}
            onDownload={handleDownloadAttachment}
            onDelete={canManageAttachments() ? handleDeleteAttachment : undefined}
            canDelete={canManageAttachments()}
          />
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Comentários ({ticket.comments?.length || 0})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="mb-6">
            <div className="mb-2">
              <textarea
                value={commentMessage}
                onChange={(e) => setCommentMessage(e.target.value)}
                placeholder="Adicione um comentário..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                disabled={isSubmittingComment}
              />
            </div>
            {commentError && (
              <div className="mb-2 text-sm text-red-600">{commentError}</div>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmittingComment || !commentMessage.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingComment ? 'Enviando...' : 'Adicionar Comentário'}
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {ticket.comments && ticket.comments.length > 0 ? (
              ticket.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{comment.user.name}</p>
                      <p className="text-sm text-gray-500">{comment.user.email}</p>
                    </div>
                    <p className="text-xs text-gray-400">{formatDate(comment.createdAt)}</p>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap mt-2">{comment.message}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                Nenhum comentário ainda. Seja o primeiro a comentar!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
