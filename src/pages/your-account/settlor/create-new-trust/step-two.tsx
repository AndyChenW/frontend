import React from 'react'
import SimpleBar from 'simplebar-react'
import { Box, Flex, Text } from 'rebass/styled-components'
import {
  IWizardButton,
  IWizardHeader,
  YourAccountLayout,
  WizardHeader,
  WizardButtons,
} from '../../../../components'
import { useTranslation } from 'react-i18next'
import { Calendar as CalendarIcon } from 'react-feather'
import {
  Spacer,
  Title,
  Input,
  DatePicker,
  ErrorMessage,
} from '../../../../theme/ui'
import { FullData } from '../../../../interfaces'
import { useResponsive, useTheme } from '../../../../hooks'
// import { SelectOption } from '../../../../theme/ui/forms/input/interfaces'
// import { INTERVAL_OPTIONS } from '../../../../constants'
import { useForm, Controller, UseFormSetValue } from 'react-hook-form'
import DropDown from '../../../../components/dropw-down'

const StepTwo: React.FC<FullData> = ({ setForm, formData, navigation }) => {
  const { t } = useTranslation('yourAccount')
  const { t: tc } = useTranslation('common')
  const { fontWeight, spacer } = useTheme()
  const { isTablet } = useResponsive()

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  })

  const intervalInputBoxRef = React.useRef<any>()
  const intervalMenuWidth = React.useMemo(
    () => {
      if (!intervalInputBoxRef?.current) return 169
      return intervalInputBoxRef.current.offsetWidth
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [intervalInputBoxRef.current],
  )

  const { totalDepositAmount, releaseInterval } = watch()

  const headers = React.useMemo(
    (): IWizardHeader[] => [
      {
        title: t('create-new-trust.menu.step-one'),
        number: 1,
        status: 'done',
      },
      {
        title: t('create-new-trust.menu.step-two'),
        number: 2,
        status: 'active',
      },
      {
        title: t('create-new-trust.menu.step-three'),
        number: 3,
        status: 'inactive',
      },
    ],
    [t],
  )

  const buttons = React.useMemo(
    (): IWizardButton[] => [
      {
        title: t('button.label.back'),
        onClick: navigation?.previous,
        buttonProps: isTablet
          ? {
              variant: 'grey-outline',
              width: 240,
            }
          : {
              variant: 'grey-outline',
              flex: 1,
            },
      },
      {
        title: t('button.label.next'),
        buttonProps: isTablet
          ? {
              type: 'submit',
              width: 240,
            }
          : {
              type: 'submit',
              flex: 1,
            },
      },
    ],
    [isTablet, navigation?.previous, t],
  )

  const onSubmit = React.useCallback(
    data => {
      if (!setForm) return
      Object.keys(data).map((key: string) => {
        setForm({
          target: {
            name: key,
            value: data[key],
          },
        })
      })
      navigation?.next()
    },
    [navigation, setForm],
  )

  React.useEffect(() => {
    if (!totalDepositAmount) {
      setValue('releaseAmount', '')
    }
  }, [totalDepositAmount, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <YourAccountLayout layoutBackgroundImage='/images/bg-settlor.svg'>
        <Flex
          flexDirection='column'
          justifyContent='flex-start'
          variant='layout-content'
          alignItems='center'
        >
          <Box width='100%' mb={[spacer.xxxl, spacer.xxxl, 0]}>
            <Title
              title={t('content.title.settlor')}
              subtitle={t('content.subtitle.settlor-new-trust')}
            />
            <Spacer size='xl' />
            <Box as='p' fontSize='md'>
              {t('content.description.settlor-steps')}
            </Box>
            <Spacer size='xl' />
            <WizardHeader headers={headers} />
          </Box>

          <Spacer size='xxxl' />

          <Box width='100%' mb='auto'>
            <Flex flexDirection='row' justifyContent='space-between'>
              <Box flex={1}>
                <Flex
                  variant='outlined-box'
                  flexDirection='column'
                  alignItems='center'
                  sx={{ borderBottomColor: 'transparent' }}
                >
                  <Text fontWeight={fontWeight.medium}>
                    {t('create-new-trust.label.new-trust')}
                  </Text>
                </Flex>
                <Input
                  {...register('fundName', {
                    required: {
                      value: true,
                      message: tc('error.field-is-required'),
                    },
                  })}
                />
                {errors?.fundName?.message && (
                  <ErrorMessage>
                    {tc(`${errors?.fundName?.message}`)}
                  </ErrorMessage>
                )}
              </Box>

              <Spacer size='xl' />

              <Box flex={1}>
                <Flex
                  variant='outlined-box'
                  flexDirection='column'
                  alignItems='center'
                  sx={{ borderBottomColor: 'transparent' }}
                >
                  <Text fontWeight={fontWeight.medium}>
                    {t('create-new-trust.label.beneficiary-address')}
                  </Text>
                </Flex>
                <Input
                  {...register('beneficiaryAddress', {
                    required: {
                      value: true,
                      message: tc('error.field-is-required'),
                    },
                    pattern: {
                      value: /^0x[a-fA-F0-9]{40}$/,
                      message: tc('error.field-is-not-eth-address'),
                    },
                  })}
                />
                {errors?.beneficiaryAddress?.message && (
                  <ErrorMessage>
                    {tc(`${errors?.beneficiaryAddress?.message}`)}
                  </ErrorMessage>
                )}
              </Box>
            </Flex>

            <Spacer size='xxxxl' />

            {isTablet ? (
              <Flex flexDirection='row' justifyContent='space-between'>
                <Box flex={1}>
                  <Flex
                    variant='outlined-box'
                    flexDirection='column'
                    alignItems='center'
                    sx={{ borderBottomColor: 'transparent' }}
                  >
                    <Text fontWeight={fontWeight.medium}>
                      {t('create-new-trust.label.release-start')}
                    </Text>
                  </Flex>
                  <Controller
                    control={control}
                    name='releaseStartTime'
                    rules={{
                      required: {
                        value: true,
                        message: tc('error.field-is-required'),
                      },
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <DatePicker
                        dateFormat='yyyy/MM/dd'
                        minDate={new Date()}
                        onChange={(date: Date) => onChange(date)}
                        selected={value}
                        ref={ref}
                        endAdornment={
                          <Box mr={16}>
                            <CalendarIcon height={16} />
                          </Box>
                        }
                      />
                    )}
                  />

                  {errors?.releaseStartTime?.message && (
                    <ErrorMessage>
                      {tc(`${errors?.releaseStartTime?.message}`)}
                    </ErrorMessage>
                  )}
                </Box>

                <Spacer size='xl' />

                <Box flex={1} ref={intervalInputBoxRef}>
                  <Flex
                    variant='outlined-box'
                    flexDirection='column'
                    alignItems='center'
                    sx={{ borderBottomColor: 'transparent' }}
                  >
                    <Text fontWeight={fontWeight.medium}>
                      {t('create-new-trust.label.release-interval')}
                    </Text>
                  </Flex>
                  <DropDown
                    buttonComponent={
                      <Controller
                        control={control}
                        name='releaseInterval'
                        rules={{
                          required: {
                            value: true,
                            message: tc('error.field-is-required'),
                          },
                          min: {
                            value: 1,
                            message: tc('error.field-min-days'),
                          },
                          pattern: {
                            value: /^[0-9]*$/,
                            message: tc('error.field-must-be-number'),
                          },
                        }}
                        render={({ field: { onChange, ref } }) => (
                          <Input
                            onChange={onChange}
                            endAdornment={
                              <Box mr={16}>
                                {releaseInterval !== ''
                                  ? releaseInterval > 1
                                    ? tc('days')
                                    : tc('day')
                                  : null}
                              </Box>
                            }
                            ref={ref}
                          />
                        )}
                      />
                    }
                    menuComponent={
                      <IntervalMenu
                        fieldName='releaseInterval'
                        setValue={setValue}
                      />
                    }
                    menuStyle={{
                      height: 60,
                      width: intervalMenuWidth,
                    }}
                  />
                  {errors?.releaseInterval?.message && (
                    <ErrorMessage>
                      {tc(`${errors?.releaseInterval?.message}`)}
                    </ErrorMessage>
                  )}
                </Box>

                <Spacer size='xl' />

                <Box flex={1}>
                  <Flex
                    variant='outlined-box'
                    flexDirection='column'
                    alignItems='center'
                    sx={{ borderBottomColor: 'transparent' }}
                  >
                    <Text fontWeight={fontWeight.medium}>
                      {t('create-new-trust.label.total-amount')}
                    </Text>
                  </Flex>
                  <Input
                    {...register('totalDepositAmount', {
                      required: {
                        value: true,
                        message: tc('error.field-is-required'),
                      },
                      pattern: {
                        value: /^\d*\.?\d*$/,
                        message: tc('error.field-must-be-number'),
                      },
                    })}
                  />
                  {errors?.totalDepositAmount?.message && (
                    <ErrorMessage>
                      {tc(`${errors?.totalDepositAmount?.message}`)}
                    </ErrorMessage>
                  )}
                </Box>

                <Spacer size='xl' />

                <Box flex={1}>
                  <Flex
                    variant='outlined-box'
                    flexDirection='column'
                    alignItems='center'
                    sx={{ borderBottomColor: 'transparent' }}
                  >
                    <Text fontWeight={fontWeight.medium}>
                      {t('create-new-trust.label.release-amount')}
                    </Text>
                  </Flex>
                  <Input
                    {...register('releaseAmount', {
                      required: {
                        value: true,
                        message: tc('error.field-is-required'),
                      },
                      min: {
                        value: 0.00000001,
                        message: tc('error.field-min-value-exceeded'),
                      },
                      max: {
                        value: totalDepositAmount,
                        message: tc('error.field-max-value-exceeded'),
                      },
                      pattern: {
                        value: /^\d*\.?\d*$/,
                        message: tc('error.field-must-be-number'),
                      },
                    })}
                    disabled={!!!totalDepositAmount?.length}
                  />
                  {errors?.releaseAmount?.message && (
                    <ErrorMessage>
                      {tc(`${errors?.releaseAmount?.message}`)}
                    </ErrorMessage>
                  )}
                </Box>
              </Flex>
            ) : (
              <>
                <Flex flexDirection='row' justifyContent='space-between'>
                  <Box flex={1}>
                    <Flex
                      variant='outlined-box'
                      flexDirection='column'
                      alignItems='center'
                      sx={{ borderBottomColor: 'transparent' }}
                    >
                      <Text fontWeight={fontWeight.medium}>
                        {t('create-new-trust.label.release-start')}
                      </Text>
                    </Flex>
                    <Controller
                      control={control}
                      name='releaseStartTime'
                      rules={{
                        required: {
                          value: true,
                          message: tc('error.field-is-required'),
                        },
                      }}
                      render={({ field: { onChange, value, ref } }) => (
                        <DatePicker
                          dateFormat='yyyy/MM/dd'
                          minDate={new Date()}
                          onChange={(date: Date) => onChange(date)}
                          selected={value}
                          ref={ref}
                          endAdornment={
                            <Box mr={16}>
                              <CalendarIcon height={16} />
                            </Box>
                          }
                        />
                      )}
                    />

                    {errors?.releaseStartTime?.message && (
                      <ErrorMessage>
                        {tc(`${errors?.releaseStartTime?.message}`)}
                      </ErrorMessage>
                    )}
                  </Box>

                  <Spacer size='xl' />

                  <Box flex={1} ref={intervalInputBoxRef}>
                    <Flex
                      variant='outlined-box'
                      flexDirection='column'
                      alignItems='center'
                      sx={{ borderBottomColor: 'transparent' }}
                    >
                      <Text fontWeight={fontWeight.medium}>
                        {t('create-new-trust.label.release-interval')}
                      </Text>
                    </Flex>
                    <DropDown
                      buttonComponent={
                        <Controller
                          control={control}
                          name='releaseInterval'
                          rules={{
                            required: {
                              value: true,
                              message: tc('error.field-is-required'),
                            },
                            min: {
                              value: 1,
                              message: tc('error.field-min-days'),
                            },
                            pattern: {
                              value: /^[0-9]*$/,
                              message: tc('error.field-must-be-number'),
                            },
                          }}
                          render={({ field: { onChange, ref } }) => (
                            <Input
                              onChange={onChange}
                              endAdornment={
                                <Box mr={16}>
                                  {releaseInterval !== ''
                                    ? releaseInterval > 1
                                      ? tc('days')
                                      : tc('day')
                                    : null}
                                </Box>
                              }
                              ref={ref}
                            />
                          )}
                        />
                      }
                      menuComponent={
                        <IntervalMenu
                          fieldName='releaseInterval'
                          setValue={setValue}
                        />
                      }
                      menuStyle={{
                        height: 60,
                        width: intervalMenuWidth,
                      }}
                    />
                    {errors?.releaseInterval?.message && (
                      <ErrorMessage>
                        {tc(`${errors?.releaseInterval?.message}`)}
                      </ErrorMessage>
                    )}
                  </Box>
                </Flex>

                <Spacer size='xxxxl' />

                <Flex flexDirection='row' justifyContent='space-between'>
                  <Box flex={1}>
                    <Flex
                      variant='outlined-box'
                      flexDirection='column'
                      alignItems='center'
                      sx={{ borderBottomColor: 'transparent' }}
                    >
                      <Text fontWeight={fontWeight.medium}>
                        {t('create-new-trust.label.total-amount')}
                      </Text>
                    </Flex>
                    <Input
                      {...register('totalDepositAmount', {
                        required: {
                          value: true,
                          message: tc('error.field-is-required'),
                        },
                        pattern: {
                          value: /^\d*\.?\d*$/,
                          message: tc('error.field-must-be-number'),
                        },
                      })}
                    />
                    {errors?.totalDepositAmount?.message && (
                      <ErrorMessage>
                        {tc(`${errors?.totalDepositAmount?.message}`)}
                      </ErrorMessage>
                    )}
                  </Box>

                  <Spacer size='xl' />

                  <Box flex={1}>
                    <Flex
                      variant='outlined-box'
                      flexDirection='column'
                      alignItems='center'
                      sx={{ borderBottomColor: 'transparent' }}
                    >
                      <Text fontWeight={fontWeight.medium}>
                        {t('create-new-trust.label.release-amount')}
                      </Text>
                    </Flex>
                    <Input
                      {...register('releaseAmount', {
                        required: {
                          value: true,
                          message: tc('error.field-is-required'),
                        },
                        min: {
                          value: 0.00000001,
                          message: tc('error.field-min-value-exceeded'),
                        },
                        max: {
                          value: totalDepositAmount,
                          message: tc('error.field-max-value-exceeded'),
                        },
                        pattern: {
                          value: /^\d*\.?\d*$/,
                          message: tc('error.field-must-be-number'),
                        },
                      })}
                      disabled={!!!totalDepositAmount?.length}
                    />
                    {errors?.releaseAmount?.message && (
                      <ErrorMessage>
                        {tc(`${errors?.releaseAmount?.message}`)}
                      </ErrorMessage>
                    )}
                  </Box>
                </Flex>
              </>
            )}
          </Box>

          <WizardButtons buttons={buttons} />
        </Flex>
      </YourAccountLayout>
    </form>
  )
}

interface IntervalMenuProps {
  show?: boolean
  handleToggle?: React.EffectCallback
  handleOpen?: React.EffectCallback
  handleClose?: React.EffectCallback
  fieldName: string
  setValue: UseFormSetValue<any>
}
interface IOption {
  label: string
  value: number
}

const IntervalMenu: React.FC<IntervalMenuProps> = ({
  handleClose,
  fieldName,
  setValue,
}) => {
  const { t } = useTranslation('common')
  const { colors, fontSizes } = useTheme()
  const options = React.useMemo(
    (): IOption[] => [
      {
        label: t('label.10days'),
        value: 10,
      },
      {
        label: t('label.15days'),
        value: 15,
      },
      {
        label: t('label.30days'),
        value: 30,
      },
      {
        label: t('label.90days'),
        value: 90,
      },
      {
        label: t('label.180days'),
        value: 180,
      },
      {
        label: t('label.360days'),
        value: 360,
      },
    ],
    [t],
  )

  const handleClick = React.useCallback(
    (value: number) => {
      if (!handleClose) return
      setValue(fieldName, value)
      handleClose()
    },
    [fieldName, handleClose, setValue],
  )

  return (
    <Box
      sx={{
        py: '2px',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.black,
        borderTopWidth: 0,
        color: colors.black,
        bg: colors.white,
      }}
    >
      <Box
        sx={{
          py: '8px',
          mx: 10,
          color: colors.grey[200],
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          borderBottomColor: colors.grey[200],
        }}
      >
        {t('label.suggestions')}
      </Box>
      <SimpleBar style={{ maxHeight: 80 }}>
        <Flex flexDirection='column' px={10}>
          {options.map((option: IOption, index: number) => (
            <Box
              key={option.value}
              onClick={() => handleClick(option.value)}
              sx={{
                cursor: 'pointer',
                py: '8px',
                px: 10,
                borderBottomStyle: 'solid',
                borderBottomWidth: index < options.length - 1 ? 1 : 0,
                borderBottomColor: colors.grey[200],
                fontSize: fontSizes.lg,
              }}
            >
              {option.label}
            </Box>
          ))}
        </Flex>
      </SimpleBar>
    </Box>
  )
}

export default StepTwo
