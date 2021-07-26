import React from 'react'
import numeral from 'numeral'
import { useActiveWeb3React } from '../../../libs/wallet'
import { Box, Flex, Text } from 'rebass/styled-components'
import { useTranslation } from 'react-i18next'
import { shortenAddress } from '../../../libs/wallet/utils'
import Table from '../../../theme/ui/layout/table/index'
import { TableColumnProps } from '../../../theme/ui/layout/table/interfaces'
import { useGetTrustListAsSettlor } from '../../../libs/detrust/hooks/useContractGet'
import moment from 'moment'
import { useDetrust } from '../../../libs/detrust'
import BigNumber from 'bignumber.js'
import { ETH_ADDRESS, NUMBER_FORMAT, ONE_DAY_SECONDS } from '../../../constants'
import { TokenIcon, TokenName } from '../../'
import { useResponsive, useTheme } from '../../../hooks'
import { Spacer, Button } from '../../../theme/ui'
import { useRouter } from 'next/router'
import usePrices from '../../../hooks/usePrices'

export const TrustList: React.FC = ({ ...restprops }) => {
  const { colors, fontWeight, spacer } = useTheme()
  const { account } = useActiveWeb3React()
  const { t } = useTranslation('yourAccount')
  const { data: trustList, isLoading } = useGetTrustListAsSettlor()
  const { walletTrustTokens } = useDetrust()
  const { walletTrustTokens: walletPrices } = usePrices()
  const { isTablet } = useResponsive()

  const data = React.useMemo(
    () =>
      trustList
        ? trustList?.map((trust: any) => {
            const timeInterval: BigNumber = trust.timeInterval
            const days = timeInterval.dividedBy(ONE_DAY_SECONDS)
            return {
              key: trust.id,
              asset: trust.name,
              blockchain: ETH_ADDRESS,
              available: '12.05',
              unlockdate: {
                firstLine: moment
                  .unix(trust.nextReleaseTime.toString())
                  .format('YYYY-MM-DD'),
                secondLine: moment
                  .unix(trust.nextReleaseTime.toString())
                  .format('h.mm a'),
              },
              unlockperiod: timeInterval.isGreaterThanOrEqualTo(ONE_DAY_SECONDS)
                ? {
                    number: days.toFixed(0),
                    timePeriod: days.isEqualTo(1)
                      ? t('option.label.day')
                      : t('option.label.days'),
                  }
                : {
                    number: timeInterval.toFixed(0),
                    timePeriod: t('option.label.seconds'),
                  },
              numpayouts: trust.totalAmount
                .dividedBy(trust.amountPerTimeInterval)
                .toFixed(0),
              totalAmount: trust.totalAmount.toFixed(2),
            }
          })
        : [],
    [t, trustList],
  )

  const columns = React.useMemo(
    (): TableColumnProps[] => [
      {
        key: 'icon',
        dataIndex: 'asset',
        title: t('label.trust-list.asset-name'),
        width: '200px',
        align: 'left',
        Render(data) {
          return (
            <Flex flexDirection='row' alignItems='center'>
              <Box pr={12}>
                <TokenIcon className='list-icon' address={data.blockchain} />
              </Box>
              <Box>
                <Text fontWeight={fontWeight.medium}>{data.asset}</Text>
                <TokenName
                  address={data.blockchain}
                  as='p'
                  fontSize='md'
                  color={colors.grey[200]}
                />
              </Box>
            </Flex>
          )
        },
      },
      {
        key: 'unlockdate',
        dataIndex: 'unlockdate',
        title: t('label.trust-list.first-unlock-date'),
        width: '150px',
        align: 'center',
        hideSort: true,
        Render(data) {
          return (
            <Flex flexDirection='column' alignItems='center'>
              <Text fontWeight={fontWeight.medium}>
                {data.unlockdate?.firstLine}
              </Text>
              <Text as='p' fontSize='md' color={colors.grey[200]}>
                {data.unlockdate?.secondLine} UTC
              </Text>
            </Flex>
          )
        },
      },
      {
        key: 'unlockinterval',
        dataIndex: 'unlockinterval',
        title: t('label.trust-list.unlock-interval'),
        width: '100px',
        align: 'center',
        hideSort: true,
        Render(data) {
          return (
            <Flex flexDirection='column' alignItems='center'>
              <Text fontWeight={fontWeight.medium}>
                {data.unlockperiod.number}
              </Text>
              <Text as='p' fontSize='md' color={colors.grey[200]}>
                {data.unlockperiod.timePeriod}
              </Text>
            </Flex>
          )
        },
      },
      {
        key: 'numpayouts',
        dataIndex: 'numpayouts',
        title: t('label.trust-list.num-payouts'),
        width: '150px',
        align: 'center',
        hideSort: true,
        Render(data) {
          return (
            <Flex flexDirection='column' alignItems='center'>
              <Text fontWeight={fontWeight.medium}>{data.numpayouts}</Text>
              <Text as='p' fontSize='md' color={colors.grey[200]}>
                {t('content.trust-list.payouts')}
              </Text>
            </Flex>
          )
        },
      },
      {
        key: 'totalamount',
        dataIndex: 'totalamount',
        title: t('label.trust-list.total-amount'),
        width: '120px',
        align: 'right',
        hideSort: true,
        Render(data) {
          return (
            <Flex flexDirection='column' alignItems='flex-end'>
              <Text fontWeight={fontWeight.medium}>{data.totalAmount}</Text>
              <Text as='p' fontSize='md' color={colors.grey[200]}>
                ≈ $
                {walletPrices &&
                  numeral(
                    new BigNumber(data.totalAmount ?? 0)
                      .multipliedBy(
                        walletPrices[walletTrustTokens[0]?.contract_address]
                          ?.price_usd,
                      )
                      .toFixed(2),
                  ).format(NUMBER_FORMAT[2])}
              </Text>
            </Flex>
          )
        },
      },
    ],
    [colors.grey, fontWeight.medium, t, walletPrices, walletTrustTokens],
  )

  return (
    <Box variant='list' {...restprops}>
      <Flex variant='list-title'>
        <Box sx={{ textTransform: 'uppercase' }}>{t('trust-list.title')}</Box>
        <Box fontSize='md'>{shortenAddress(account!, 8)}</Box>
      </Flex>

      <Box overflowX='auto' mb={[spacer['xxl'], spacer['xxl'], 0]}>
        <Table
          columns={columns}
          subRowComponent={(data: any) => <SubRow data={data} />}
          dataSource={data}
          loading={isLoading}
          minWidth={650}
          tableHeaderStyle={{
            minWidth: 650,
          }}
          scrollbarsStyle={{
            height: isTablet ? 290 : 'auto',
          }}
        />
      </Box>
    </Box>
  )
}

interface SubRowProps {
  data: any
}
const SubRow: React.FC<SubRowProps> = ({ data }) => {
  const { t } = useTranslation('yourAccount')
  const { colors, fontWeight } = useTheme()
  const router = useRouter()
  return (
    <Flex variant='list-details'>
      <Flex sx={{ position: 'relative' }} flex={0.7}>
        <Flex variant='overlay'>
          <Box as='span' bg={colors.white} p={10}>
            Work in progress.
          </Box>
        </Flex>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          flex={1}
          py={10}
        >
          <Text color={colors.red[100]} fontWeight={fontWeight.semiBold}>
            {' '}
            {t('content.trust-list.claimed')}
          </Text>
          <Spacer size='lg' />
          <Text fontWeight={fontWeight.semiBold}>0.00 ETH</Text>
          <Text color={colors.grey[200]} mt={1} fontSize='md'>
            ≈ $0.00
          </Text>
        </Flex>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          flex={1}
          py={10}
        >
          <Text fontWeight={fontWeight.semiBold}>
            {t('content.trust-list.locked')}
          </Text>
          <Spacer size='lg' />
          <Text fontWeight={fontWeight.semiBold}>0.00 ETH</Text>
          <Text color={colors.grey[200]} mt={1} fontSize='md'>
            ≈ $0.00
          </Text>
        </Flex>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          flex={1}
          py={10}
        >
          <Text fontWeight={fontWeight.semiBold} color={colors.green}>
            {t('content.trust-list.unclaimed')}
          </Text>
          <Spacer size='lg' />
          <Text fontWeight={fontWeight.semiBold}>0.00 ETH</Text>
          <Text color={colors.grey[200]} mt={1} fontSize='md'>
            ≈ $0.00
          </Text>
        </Flex>
      </Flex>

      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        flex={0.3}
        py={10}
      >
        <Text paddingBottom='13px' fontWeight={fontWeight.semiBold}>
          {t('content.subtitle.settlor-top-up.add')}
        </Text>

        <Button
          variant='primary'
          fontSize={10}
          width={120}
          py={10}
          sx={{ textTransform: 'uppercase' }}
          onClick={() =>
            router.push(`/your-account/settlor/top-up-fund/${data.key}`)
          }
        >
          {t('button.label.top-up')}
        </Button>
      </Flex>
    </Flex>
  )
}
