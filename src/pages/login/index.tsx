import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import * as H from 'history'
import {
  Button,
  InputItem,
  Toast,
  List,
  WhiteSpace,
  WingBlank,
} from 'antd-mobile'
import { useAuth } from '@/hooks'

interface LoginState {
  from: H.Location
}

function LoginPage() {
  const history = useHistory()
  const location = useLocation<LoginState>()
  const auth = useAuth()
  const { from } = location.state || { from: { pathname: '/' } }
  if (auth.user) {
    history.replace(from)
    return null
  }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState(false)
  const checkLogin = () => {
    if (hasError) {
      Toast.info('请输入正确的手机号')
      return
    }
    auth.login({
      username,
      password,
      callback: (result) => {
        if (result) {
          history.replace(from)
        }
      },
    })
  }

  const onErrorClick = () => {
    if (hasError) {
      Toast.info('请输入正确的手机号')
    }
  }

  return (
    <WingBlank>
      <List renderHeader={() => '登录'}>
        <InputItem
          type="phone"
          placeholder="请输入你的手机号"
          error={hasError}
          onErrorClick={onErrorClick}
          onChange={(value) => {
            if (value.replace(/\s+/g, '').length != 11) {
              setHasError(true)
            } else {
              setHasError(false)
            }
            setUsername(value.replace(/\s+/g, ''))
          }}
          value={username}
          clear
        >
          手机号
        </InputItem>
        <InputItem
          type="password"
          clear
          placeholder="请输入密码"
          onErrorClick={onErrorClick}
          onChange={setPassword}
          value={password}
        >
          密码
        </InputItem>
        <WhiteSpace />
        <Button onClick={checkLogin}>登录</Button>
        <WhiteSpace />
      </List>
    </WingBlank>
  )
}

export default LoginPage
