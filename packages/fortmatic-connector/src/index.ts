import { ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'
import invariant from 'tiny-invariant'

const chainIdToNetwork: { [network: number]: string } = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  42: 'kovan',
  46116242285844: "arbitrum_testnet"
}

interface FortmaticConnectorArguments {
  apiKey: string
  chainId: number
  nodeUrl: string
}

export class FortmaticConnector extends AbstractConnector {
  public readonly apiKey: string
  public readonly chainId: number
  public readonly nodeUrl: string

  public fortmatic: any

  constructor({ apiKey, chainId, nodeUrl }: FortmaticConnectorArguments) {
    invariant(Object.keys(chainIdToNetwork).includes(chainId.toString()), `Unsupported chainId ${chainId}`)
    super({ supportedChainIds: [chainId] })

    this.apiKey = apiKey
    this.chainId = chainId
    this.nodeUrl = nodeUrl
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (!this.fortmatic) {
      const Fortmatic = await import('fortmatic').then(m => m?.default ?? m)
      this.fortmatic = new Fortmatic(
        this.apiKey,
        this.chainId === 1 || this.chainId === 4 ? undefined : chainIdToNetwork[this.chainId]
      )
    }

    const account = await this.fortmatic
      .getProvider()
      .enable()
      .then((accounts: string[]): string => accounts[0])

    return { provider: this.fortmatic.getProvider(), chainId: this.chainId, account }
  }

  public async getProvider(): Promise<any> {
    return this.fortmatic.getProvider()
  }

  public async getChainId(): Promise<number | string> {
    return this.chainId
  }

  public async getAccount(): Promise<null | string> {
    return this.fortmatic
      .getProvider()
      .send('eth_accounts')
      .then((accounts: string[]): string => accounts[0])
  }

  public deactivate() {}

  public async close() {
    await this.fortmatic.user.logout()
    this.emitDeactivate()
  }
}
