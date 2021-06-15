import React, { useMemo } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import routes, { RouteItem } from '@/config/routes'
import { useAuth } from '@/hooks'
import HomePage from '@/pages/index'
import { Flex } from 'antd-mobile'
import Header from './header'

const PrivateRoute: React.FC<any> = (props) => {
  const {
    children,
    component,
    path,
    auth: needAuth = false,
    location,
    ...rest
  } = props
  const auth = useAuth()
  return (
    <>
      {!auth.user && needAuth ? (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ) : (
        <Route {...rest} path={path} component={component} />
      )}
    </>
  )
}

const cleanRoutes = (routes: RouteItem[], needAuth = false): RouteItem[] => {
  return routes
    .map((route) => {
      if (route.hideInRoute) {
        return null
      }
      const finalRoute = { auth: needAuth, ...route }
      const auth = finalRoute.auth
      if (route.children) {
        return cleanRoutes(route.children, auth)
      }
      return finalRoute
    })
    .filter(Boolean)
    .flat(1) as RouteItem[]
}

const BaseLayout: React.FC = () => {
  const cleanRoute = useMemo(() => cleanRoutes(routes), [routes])
  return (
    <div>
      <Header />
      <Flex.Item>
        <Switch>
          {cleanRoute.map((route, index) => (
            <PrivateRoute {...route} key={index} />
          ))}
          <PrivateRoute path="/" auth exact component={HomePage} />
        </Switch>
      </Flex.Item>
    </div>
  )
}

export default BaseLayout
