import React from 'react'

const styles = 'lg:border-2 lg:border-slate-600 rounded-sm w-full grid  md:grid-cols-2 gap-5 md:gap-0 lg:grid-cols-3 mb-20';

const GridLayout = ({children, className=styles}) => {
  return (
    <section className={className}>
      {children}
    </section>
  )
}

export default GridLayout
