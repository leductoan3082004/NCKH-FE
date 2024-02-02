import MainFooter from 'src/components/MainFooter'
import MainHeader from 'src/components/MainHeader'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className='bg-mainBg'>
      <div className='fixed z-10 w-full'>
        <MainHeader />
      </div>
      <div className='pt-10 tablet:pt-12 desktop:pt-14'>{children}</div>
      <MainFooter />
    </div>
  )
}
