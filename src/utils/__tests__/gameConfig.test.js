import { DIFFICULTY_LEVELS } from '../gameConfig'

describe('gameConfig', () => {
  test('should have 3 difficulty levels', () => {
    expect(DIFFICULTY_LEVELS).toHaveLength(3)
  })

  test('should have correct easy difficulty', () => {
    expect(DIFFICULTY_LEVELS[0]).toEqual({
      name: 'Easy',
      rows: 2,
      cols: 2,
      id: 'easy'
    })
  })
})