
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IncidentlensAmdSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = IncidentlensAmdSDK.test()
    equal(testsdk instanceof IncidentlensAmdSDK, true,
      'IncidentlensAmdSDK.test() must return a client synchronously')
  })

})
