const ets2js = require('./index')

let groups

test('Read file', async () => {
  groups = await ets2js.getGroupsFromFile('./groups.test.xml')
  console.log(groups)
  expect(groups).toBeDefined()
})
test('Group 1', () => {
  expect(groups[0].Name).toBe('Group 1')
  expect(groups[0].Address).toBe('0/0/1')
  expect(groups[0].DPTs).toBe('DPST-1-1')
})
test('Group 2', () => {
  expect(groups[1].Name).toBe('Group 2')
  expect(groups[1].Address).toBe('1/0/0')
  expect(groups[1].DPTs).toBe('DPST-5-1')
})
test('Group 3', () => {
  expect(groups[2].Name).toBe('Group 3')
  expect(groups[2].Address).toBe('1/1/0')
  expect(groups[2].DPTs).toBe('DPST-1-11')
})
test('Group 4', () => {
  expect(groups[3].Name).toBe('Group 4')
  expect(groups[3].Address).toBe('1/1/1')
  expect(groups[3].DPTs).toBe('DPST-1-1')
})
