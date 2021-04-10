import React from 'react'
import { Breadcrumb } from 'react-bootstrap'

const styles = {
  breadcrumb: {
    marginTop: '1%',
  },
}

type Props = {
  readonly values: string[]
  readonly loading: boolean
}

const AppBreadcrumb: React.FC<Props> = ({ values = [], loading = false }) => {
  const orderValues: () => string[] = () => {
    return ['', 'asdas']
  }

  return (
    <Breadcrumb style={styles.breadcrumb}>
      {!loading &&
        values.length > 0 &&
        values.map((value, index) => (
          <Breadcrumb.Item key={index}>{value}</Breadcrumb.Item>
        ))}
    </Breadcrumb>
  )
}

export default AppBreadcrumb
