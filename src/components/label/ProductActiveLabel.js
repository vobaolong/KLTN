import { useTranslation } from 'react-i18next'

const ProductActiveLabel = ({ isActive = false, detail = true }) => {
	const { t } = useTranslation()
	return (
		<span className='position-relative d-inline-block'>
			{isActive ? (
				<span className='badge bg-success cus-tooltip rounded-1'>
					<i className='fas fa-check-circle'></i>
					{detail && <span className='ms-2'>{t('status.active')}</span>}
				</span>
			) : (
				<span className='badge bg-danger cus-tooltip'>
					<i className='fas fa-times-circle'></i>
					{detail && <span className='ms-2'>{t('status.banned')}</span>}
				</span>
			)}
			{isActive ? (
				<small className='cus-tooltip-msg'>
					This product is licensed by Zenpii!
				</small>
			) : (
				<small className='cus-tooltip-msg'>
					This product is banned by Zenpii, contact us for more information!
				</small>
			)}
		</span>
	)
}
export default ProductActiveLabel
