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
    const result: any[] = []

    ;[...new Set(values)].forEach((item) =>
      result.push({
        key: item,
        count: values.filter((i) => i === item).length,
      }),
    )
    result.sort((a, b) => b.count - a.count)

    const finalResult: string[] = result.map((item) => item.key)
    return finalResult
  }

  const finalValues: string[] = orderValues()

  return (
    <Breadcrumb style={styles.breadcrumb}>
      {!loading &&
        values.length > 0 &&
        finalValues.map((value, index) => (
          <Breadcrumb.Item key={index}>{value}</Breadcrumb.Item>
        ))}
    </Breadcrumb>
  )
}

export default AppBreadcrumb
