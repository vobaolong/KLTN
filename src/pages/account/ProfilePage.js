import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AccountLayout from '../../components/layout/AccountLayout'
import UserLevelInfo from '../../components/info/UserLevelInfo'
import UserProfileInfo from '../../components/info/UserProfileInfo'
import UserJoinedInfo from '../../components/info/UserJoinedInfo'
import Cover from '../../components/image/Cover'
import Avatar from '../../components/image/Avatar'
import { useTranslation } from 'react-i18next'

const ProfilePage = (props) => {
	const user = useSelector((state) => state.account.user)
	const { t } = useTranslation()
	return (
		<AccountLayout user={user}>
			<div className='res-mx--12-md'>
				<div className='position-relative bg-body rounded-2 p-2 box-shadow'>
					<Cover
						cover={user.cover}
						alt={user.firstName + ' ' + user.lastName}
						isEditable='user'
					/>
					<div className='avatar-absolute avatar-absolute--store'>
						<Avatar
							avatar={user.avatar}
							name={user.firstName + ' ' + user.lastName}
							alt={user.firstName + ' ' + user.lastName}
							borderName={true}
							isEditable='user'
						/>
					</div>
					<div className='level-group-absolute res-hide bg-white w-50 h-100'>
						<UserLevelInfo user={user} />
					</div>
				</div>

				{/* <div className='d-flex justify-content-end mt-2 mb-3'>
          <Link
            className='btn btn-outline-primary ripple btn-sm'
            to={`/user/${user._id}`}
            target='_blank'
          >
            <span className='me-2 res-hide'>{t('visitMyPage')}</span>
            <i className='fas fa-external-link-alt'></i>
          </Link>
        </div> */}

				<div className='mt-2 d-none res-dis'>
					<UserLevelInfo user={user} border={false} />
				</div>

				<div className='mt-3'>
					<UserProfileInfo user={user} isEditable={true} />
				</div>
			</div>
		</AccountLayout>
	)
}

export default ProfilePage
