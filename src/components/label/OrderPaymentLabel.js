import { useTranslation } from 'react-i18next'

const OrderPaymentLabel = ({ isPaidBefore = false, detail = true }) => {
	const { t } = useTranslation()
	return (
		<span className='position-relative d-inline-block'>
			{isPaidBefore ? (
				<span className='badge rounded-1 bg-danger cus-tooltip'>
					{detail && <span>{t('orderDetail.onlinePayment')}</span>}
				</span>
			) : (
				<span className='badge rounded-1 bg-primary cus-tooltip'>
					{detail && <span>{t('orderDetail.cod')}</span>}
				</span>
			)}
			{/* {isPaidBefore ? (
      <small className='cus-tooltip-msg'>Payment with paypal</small>
    ) : (
      <small className='cus-tooltip-msg'>Payment on delivery</small>
    )} */}
		</span>
	)
}

export default OrderPaymentLabel
