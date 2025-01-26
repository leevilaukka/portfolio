import localFont from 'next/font/local'
 
// Font files can be colocated inside of `app`
const iconFont = localFont({
  src: '../fonts/feather.ttf',
  display: 'swap',
  variable: '--font-feather',
})

export default function Icon({name}: {name: string}) {
    return <span className={`${iconFont.className} feathericon`}>{name}</span>
}