import MainFooter from 'src/components/MainFooter'
import MainHeader from 'src/components/MainHeader'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className='bg-mainBg'>
      <MainHeader />
      {children}
      <MainFooter />
    </div>
  )
}
