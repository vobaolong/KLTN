import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import AddValueStyleForm from './form/AddValueStyleForm'

const AddValueStyleItem = ({
	styleId = '',
	styleName = '',
	onRun,
	isFullWidth = false
}) => {
	const { t } = useTranslation()
	return (
		<div
			className={`position-relative d-inline-block ${isFullWidth ? 'w-100' : ''
				}`}
		>
			<button
				type='button'
				className={`btn btn-primary ripple text-nowrap rounded-1 ${isFullWidth ? 'w-100' : ''
					}`}
				data-bs-toggle='modal'
				data-bs-target={`#add-style-value-form-${styleId}`}
			>
				<i className='fas fa-plus-circle'></i>
				<span className='ms-2 res-hide'>{t('variantDetail.value.addBtn')}</span>
			</button>

			<Modal
				id={`add-style-value-form-${styleId}`}
				hasCloseBtn={false}
				title={`${t('variantDetail.value.add')} '${styleName}'`}
			>
				<AddValueStyleForm
					styleId={styleId}
					styleName={styleName}
					onRun={onRun}
				/>
			</Modal>
		</div>
	)
}

export default AddValueStyleItem
