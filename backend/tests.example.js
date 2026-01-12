// Exemplo de Testes para a aplicação To-Do List
// Instalar primeiro: npm install --save-dev jest

const Task = require('../src/domain/entities/Task');
const CreateTaskUseCase = require('../src/application/usecases/CreateTaskUseCase');
const GetAllTasksUseCase = require('../src/application/usecases/GetAllTasksUseCase');

/**
 * TESTES DA ENTIDADE TASK (Domain Layer)
 */
describe('Task Entity', () => {
    describe('constructor', () => {
        it('deve criar uma tarefa com dados corretos', () => {
            const task = new Task('1', 'Aprender Clean Architecture');

            expect(task.id).toBe('1');
            expect(task.title).toBe('Aprender Clean Architecture');
            expect(task.completed).toBe(false);
        });

        it('deve inicializar completed como false por padrão', () => {
            const task = new Task('1', 'Tarefa');
            expect(task.completed).toBe(false);
        });
    });

    describe('markAsCompleted', () => {
        it('deve marcar a tarefa como completa', () => {
            const task = new Task('1', 'Tarefa');
            task.markAsCompleted();

            expect(task.completed).toBe(true);
        });

        it('deve atualizar o timestamp updatedAt', () => {
            const task = new Task('1', 'Tarefa');
            const oldDate = task.updatedAt;
            
            task.markAsCompleted();

            expect(task.updatedAt.getTime()).toBeGreaterThan(oldDate.getTime());
        });
    });

    describe('isValid', () => {
        it('deve retornar true para tarefa com título válido', () => {
            const task = new Task('1', 'Tarefa válida');
            expect(task.isValid()).toBe(true);
        });

        it('deve retornar false para tarefa com título vazio', () => {
            const task = new Task('1', '');
            expect(task.isValid()).toBe(false);
        });

        it('deve retornar false para tarefa com apenas espaços', () => {
            const task = new Task('1', '   ');
            expect(task.isValid()).toBe(false);
        });
    });
});

/**
 * TESTES DO USE CASE CreateTaskUseCase (Application Layer)
 */
describe('CreateTaskUseCase', () => {
    // Mock do repositório
    const mockRepository = {
        create: jest.fn()
    };

    beforeEach(() => {
        mockRepository.create.mockClear();
    });

    it('deve criar uma tarefa com título válido', async () => {
        // Arrange
        const useCase = new CreateTaskUseCase(mockRepository);
        const title = 'Nova Tarefa';
        
        mockRepository.create.mockResolvedValue(
            new Task('1', title)
        );

        // Act
        const result = await useCase.execute(title);

        // Assert
        expect(result.title).toBe(title);
        expect(result.completed).toBe(false);
        expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });

    it('deve lançar erro se título estiver vazio', async () => {
        const useCase = new CreateTaskUseCase(mockRepository);

        await expect(useCase.execute('')).rejects.toThrow(
            'O título da tarefa é obrigatório'
        );
        
        expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('deve lançar erro se título tiver mais de 255 caracteres', async () => {
        const useCase = new CreateTaskUseCase(mockRepository);
        const longTitle = 'a'.repeat(256);

        await expect(useCase.execute(longTitle)).rejects.toThrow(
            'O título da tarefa não pode ter mais de 255 caracteres'
        );
    });

    it('deve trimpar espaços em branco do título', async () => {
        const useCase = new CreateTaskUseCase(mockRepository);
        const titleWithSpaces = '  Tarefa com espaços  ';
        
        mockRepository.create.mockResolvedValue(
            new Task('1', 'Tarefa com espaços')
        );

        await useCase.execute(titleWithSpaces);

        // Verificar se o title foi trimado
        expect(mockRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Tarefa com espaços'
            })
        );
    });

    it('deve chamar repository.create com objeto Task', async () => {
        const useCase = new CreateTaskUseCase(mockRepository);
        
        mockRepository.create.mockResolvedValue(
            new Task('1', 'Test')
        );

        await useCase.execute('Test');

        expect(mockRepository.create).toHaveBeenCalledWith(
            expect.any(Task)
        );
    });
});

/**
 * TESTES DO USE CASE GetAllTasksUseCase
 */
describe('GetAllTasksUseCase', () => {
    it('deve retornar lista de tarefas', async () => {
        const mockRepository = {
            findAll: jest.fn().mockResolvedValue([
                new Task('1', 'Tarefa 1'),
                new Task('2', 'Tarefa 2'),
                new Task('3', 'Tarefa 3')
            ])
        };

        const useCase = new GetAllTasksUseCase(mockRepository);
        const result = await useCase.execute();

        expect(result).toHaveLength(3);
        expect(result[0].title).toBe('Tarefa 1');
    });

    it('deve retornar lista vazia se não houver tarefas', async () => {
        const mockRepository = {
            findAll: jest.fn().mockResolvedValue([])
        };

        const useCase = new GetAllTasksUseCase(mockRepository);
        const result = await useCase.execute();

        expect(result).toEqual([]);
    });
});

/**
 * EXEMPLO: Como executar os testes
 * 
 * 1. Instalar Jest:
 *    npm install --save-dev jest
 *
 * 2. Adicionar ao package.json:
 *    "scripts": {
 *      "test": "jest"
 *    }
 *
 * 3. Executar:
 *    npm test
 *
 * 4. Com cobertura:
 *    npm test -- --coverage
 */
