import { useState, useEffect } from 'react'
import { getToken } from '../../../apis/auth'
import { updateProfile } from '../../../apis/store'
import useUpdateDispatch from '../../../hooks/useUpdateDispatch'
import Input from '../../ui/Input'
import TextArea from '../../ui/TextArea'
import Loading from '../../ui/Loading'
import Error from '../../ui/Error'
import Success from '../../ui/Success'
import ConfirmDialog from '../../ui/ConfirmDialog'
import { useTranslation } from 'react-i18next'

const StoreEditProfileForm = ({
  name = '',
  bio = '',
  address = '',
  storeId = ''
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [profile, setProfile] = useState({})
  const [updateDispatch] = useUpdateDispatch()
  const { _id, accessToken } = getToken()

  useEffect(() => {
    setProfile({
      name: name,
      bio: bio,
      address: address,
      isValidName: true,
      isValidBio: true,
      isValidAddress: true
    })
  }, [name, bio, address, storeId])

  const handleChange = (name, isValidName, value) => {
    setProfile({
      ...profile,
      [name]: value,
      [isValidName]: true
    })
  }

  const handleValidate = (isValidName, flag) => {
    setProfile({
      ...profile,
      [isValidName]: flag
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!profile.isValidName || !profile.isValidBio || !profile.isValidAddress)
      return
    setIsConfirming(true)
  }

  const onSubmit = () => {
    let store = {
      name: profile.name,
      bio: profile.bio,
      address: profile.address
    }
    setError('')
    setSuccess('')
    setIsLoading(true)
    updateProfile(_id, accessToken, store, storeId)
      .then((data) => {
        if (data.error) setError(data.error)
        else {
          setSuccess(data.success)
          updateDispatch('vendor', data.store)
        }
        setIsLoading(false)
        setTimeout(() => {
          setError('')
          setSuccess('')
        }, 3000)
      })
      .catch((error) => {
        setError('Server error')
        setIsLoading(false)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }
  const { t } = useTranslation()
  return (
    <div className='position-relative'>
      {isLoading && <Loading />}

      {isConfirming && (
        <ConfirmDialog
          title={t('storeDetail.editProfile')}
          onSubmit={onSubmit}
          onClose={() => setIsConfirming(false)}
        />
      )}

      <form className='row mb-2' onSubmit={handleSubmit}>
        <div className='col-12'>
          <Input
            type='text'
            label={t('storeDetail.storeName')}
            value={profile.name}
            isValid={profile.isValidName}
            feedback='Please provide a valid store name.'
            validator='name'
            required={true}
            onChange={(value) => handleChange('name', 'isValidName', value)}
            onValidate={(flag) => handleValidate('isValidName', flag)}
          />
        </div>

        <div className='col-12'>
          <TextArea
            type='text'
            label={t('storeDetail.bio')}
            value={profile.bio}
            isValid={profile.isValidBio}
            feedback='Please provide a valid store bio.'
            validator='bio'
            onChange={(value) => handleChange('bio', 'isValidBio', value)}
            onValidate={(flag) => handleValidate('isValidBio', flag)}
          />
        </div>

        <div className='col-12'>
          <Input
            type='text'
            label={t('storeDetail.pickupAddress')}
            value={profile.address}
            isValid={profile.isValidAddress}
            feedback='Please provide a valid store address.'
            required={true}
            validator='address'
            onChange={(value) =>
              handleChange('address', 'isValidAddress', value)
            }
            onValidate={(flag) => handleValidate('isValidAddress', flag)}
          />
        </div>

        {error && (
          <div className='col-12'>
            <Error msg={error} />
          </div>
        )}

        {success && (
          <div className='col-12'>
            <Success msg={success} />
          </div>
        )}

        <div className='col-12 d-grid mt-4'>
          <button
            type='submit'
            className='btn btn-primary ripple rounded-1'
            onClick={handleSubmit}
          >
            {t('button.save')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default StoreEditProfileForm
