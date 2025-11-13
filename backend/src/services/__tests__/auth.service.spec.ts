import { AuthService, registerSchema, loginSchema } from '../auth.service';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock do Prisma Client
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

// Mock do bcrypt
jest.mock('bcryptjs');

// Mock do jsonwebtoken
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: any;

  beforeEach(() => {
    authService = new AuthService();
    prisma = new PrismaClient();
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'Senha@123',
        role: 'USER' as const,
      };

      const mockUser = {
        id: 'user-123',
        name: userData.name,
        email: userData.email,
        role: userData.role,
        createdAt: new Date(),
      };

      prisma.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      prisma.user.create.mockResolvedValue(mockUser);

      const result = await authService.register(userData);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: userData.email },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 12);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          name: userData.name,
          email: userData.email,
          passwordHash: 'hashed_password',
          role: userData.role,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
      expect(result).toEqual(mockUser);
    });

    it('deve lançar erro se email já estiver em uso', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'Senha@123',
      };

      prisma.user.findUnique.mockResolvedValue({
        id: 'existing-user',
        email: userData.email,
      });

      await expect(authService.register(userData)).rejects.toThrow(
        'EMAIL_ALREADY_EXISTS'
      );
      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it('deve validar senha fraca', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'senha',
      };

      await expect(authService.register(userData)).rejects.toThrow();
    });

    it('deve validar email inválido', async () => {
      const userData = {
        name: 'João Silva',
        email: 'email-invalido',
        password: 'Senha@123',
      };

      await expect(authService.register(userData)).rejects.toThrow();
    });

    it('deve usar role USER como padrão', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'Senha@123',
      };

      prisma.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      prisma.user.create.mockResolvedValue({
        id: 'user-123',
        ...userData,
        role: 'USER',
      });

      await authService.register(userData);

      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            role: 'USER',
          }),
        })
      );
    });
  });

  describe('login', () => {
    it('deve fazer login com credenciais válidas', async () => {
      // Mock da variável de ambiente
      process.env.JWT_SECRET = 'test_secret_key';
      
      const loginData = {
        email: 'joao@example.com',
        password: 'Senha@123',
      };

      const mockUser = {
        id: 'user-123',
        name: 'João Silva',
        email: loginData.email,
        passwordHash: 'hashed_password',
        role: 'USER',
        active: true,
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('mock_token');

      const result = await authService.login(loginData);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: loginData.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginData.password,
        mockUser.passwordHash
      );
      expect(jwt.sign).toHaveBeenCalled();
    });

    it('deve lançar erro com email não encontrado', async () => {
      const loginData = {
        email: 'naoexiste@example.com',
        password: 'Senha@123',
      };

      prisma.user.findUnique.mockResolvedValue(null);

      await expect(authService.login(loginData)).rejects.toThrow(
        'INVALID_CREDENTIALS'
      );
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it('deve lançar erro com senha incorreta', async () => {
      const loginData = {
        email: 'joao@example.com',
        password: 'SenhaErrada@123',
      };

      const mockUser = {
        id: 'user-123',
        email: loginData.email,
        passwordHash: 'hashed_password',
        active: true,
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login(loginData)).rejects.toThrow(
        'INVALID_CREDENTIALS'
      );
    });
  });
});
