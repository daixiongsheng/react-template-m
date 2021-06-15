import React from 'react'
import { useAuth } from '@/hooks'
import { useHistory } from 'react-router-dom'
import { Icon, NavBar } from 'antd-mobile'

const CustomHeader: React.FC = () => {
  const history = useHistory()
  const auth = useAuth()
  const logout = () => {
    auth.logout(() => {
      history.replace('/login')
    })
  }

  return (
    <NavBar
      mode="dark"
      leftContent={<div onClick={logout}>退出</div>}
      rightContent={[
        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        <Icon key="1" type="ellipsis" />,
      ]}
    >
      标题
    </NavBar>
  )
}

export default CustomHeader
