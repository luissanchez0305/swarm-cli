import { Upload } from '../../src/command/upload'
import { describeCommand, invokeTestCli } from '../utility'
import { getStampOption } from '../utility/stamp'

describeCommand('Test Download command', ({ consoleMessages }) => {
  it('should download and print to stdout', async () => {
    const invocation = await invokeTestCli(['upload', 'test/message.txt', ...getStampOption()])
    const { hash } = invocation.runnable as Upload
    consoleMessages.length = 0
    await invokeTestCli(['download', hash, '--stdout'])
    expect(consoleMessages[0]).toContain('Hello Swarm!')
  })

  it('should fall back to manifest download', async () => {
    const invocation = await invokeTestCli(['upload', 'test/testpage', ...getStampOption()])
    const { hash } = invocation.runnable as Upload
    consoleMessages.length = 0
    await invokeTestCli(['download', hash])
    expect(consoleMessages[0]).toContain('images/swarm.png')
    expect(consoleMessages[2]).toContain('index.html')
    expect(consoleMessages[4]).toContain('swarm.bzz')
  })

  it('should ignore --stdout if downloading folder', async () => {
    const invocation = await invokeTestCli(['upload', 'test/testpage', ...getStampOption()])
    const { hash } = invocation.runnable as Upload
    consoleMessages.length = 0
    await invokeTestCli(['download', hash, '--stdout'])
    expect(consoleMessages[0]).toContain('images/swarm.png')
    expect(consoleMessages[2]).toContain('index.html')
    expect(consoleMessages[4]).toContain('swarm.bzz')
  })
})
