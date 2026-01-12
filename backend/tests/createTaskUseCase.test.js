const assert = require('assert')
const CreateTaskUseCase = require('../src/application/usecases/CreateTaskUseCase')
const Task = require('../src/domain/entities/Task')

class MockTaskRepository {
  async create(task) {
    // Simula persistência retornando entidade de domínio com id
    return new Task('mock-id', task.title, task.completed, new Date(), new Date())
  }
}

async function testValidTitle() {
  const repo = new MockTaskRepository()
  const usecase = new CreateTaskUseCase(repo)
  const result = await usecase.execute('  Nova Tarefa  ')
  assert.strictEqual(result.title, 'Nova Tarefa', 'deve fazer trim do título')
  assert.strictEqual(result.completed, false, 'nova tarefa começa como não concluída')
  console.log('✔️  testValidTitle passou')
}

async function testEmptyTitle() {
  const repo = new MockTaskRepository()
  const usecase = new CreateTaskUseCase(repo)
  try {
    await usecase.execute('')
    throw new Error('Esperava erro para título vazio')
  } catch (err) {
    assert.strictEqual(
      err.message,
      'O título da tarefa é obrigatório',
      'mensagem de erro para título vazio'
    )
    console.log('✔️  testEmptyTitle passou')
  }
}

async function testTooLongTitle() {
  const repo = new MockTaskRepository()
  const usecase = new CreateTaskUseCase(repo)
  const longTitle = 'a'.repeat(256)
  try {
    await usecase.execute(longTitle)
    throw new Error('Esperava erro para título > 255')
  } catch (err) {
    assert.strictEqual(
      err.message,
      'O título da tarefa não pode ter mais de 255 caracteres',
      'mensagem de erro para título longo'
    )
    console.log('✔️  testTooLongTitle passou')
  }
}

async function run() {
  try {
    await testValidTitle()
    await testEmptyTitle()
    await testTooLongTitle()
    console.log('\n✅ Todos os testes de CreateTaskUseCase passaram')
    process.exit(0)
  } catch (e) {
    console.error('\n❌ Falha nos testes:', e)
    process.exit(1)
  }
}

run()
