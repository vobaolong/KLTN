import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../apis/auth'
import { getNumberOfFollowers, checkFollowingStore } from '../../apis/follow'
import { getStoreLevel } from '../../apis/level'
import StoreCommissionLabel from '../label/StoreCommissionLabel'
import StoreLevelLabel from '../label/StoreLevelLabel'
import StoreFollowLabel from '../label/StoreFollowLabel'
import StoreStatusLabel from '../label/StoreStatusLabel'
import StarRating from '../label/StarRating'
import FollowStoreButton from '../button/FollowStoreButton'

const IMG = process.env.REACT_APP_STATIC_URL

const StoreCardSmall = ({ store = {}, onRun }) => {
  const [storeValue, setStoreValue] = useState({})

  const init = async () => {
    let newStore = store
    try {
      const data = await getStoreLevel(store._id)
      newStore.level = data.level
    } catch {}
    try {
      const data = await getNumberOfFollowers(store._id)
      newStore.numberOfFollowers = data.count
    } catch {
      newStore.numberOfFollower = 0
    }
    try {
      const { _id, accessToken } = getToken()
      const data = await checkFollowingStore(_id, accessToken, store._id)
      newStore.isFollowing = data.success ? true : false
    } catch {
      newStore.isFollowing = false
    }

    setStoreValue(newStore)
  }

  useEffect(() => {
    init()
  }, [store])

  const onHandleRun = async (newStore) => {
    if (onRun) onRun(newStore)

    let numberOfFollowers
    try {
      const data = await getNumberOfFollowers(newStore._id)
      numberOfFollowers = data.count
    } catch {
      const currentNumberOfFollowers = storeValue.numberOfFollowers
      numberOfFollowers = newStore.isFollowing
        ? currentNumberOfFollowers + 1
        : currentNumberOfFollowers - 1
    }

    setStoreValue({
      ...storeValue,
      numberOfFollowers
    })
  }

  return (
    <div className='card-small border-0 bg-body rounded-2 w-100'>
      <Link
        className='text-reset text-decoration-none'
        to={`/store/${storeValue._id}`}
        title={storeValue.name}
      >
        <div className='card-img-top cus-card-img-top-small'>
          <img
            loading='lazy'
            src={IMG + storeValue.avatar}
            className='cus-card-img-small'
            alt={storeValue.name}
          />
        </div>
      </Link>

      <div className='card-body border-top border-value'>
        <small className='card-subtitle'>
          <div className='d-flex justify-content-between align-items-center'>
            {getToken() && (
              <FollowStoreButton
                storeId={store._id}
                isFollowing={store.isFollowing}
                className='w-70'
                onRun={(store) => onHandleRun(store)}
              />
            )}
            <label className='btn w-25 btn-group border rounded-1 justify-content-center'>
              {storeValue.numberOfFollowers}
            </label>
          </div>
        </small>
      </div>
    </div>
  )
}

export default StoreCardSmall
