import React from 'react'

const styles = 'w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20';

const GridLayout = ({children, className=styles}) => {
  return (
    <section className={className}>
      {children}
    </section>
  )
}

export default GridLayout
