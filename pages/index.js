import Link from "next/link"
import { DatabaseIcon } from "@heroicons/react/outline"
import Footer from "../components/Footer"

const togane = [
  {
    name: "読売センター 東金中央",
    href: "/form?type=chuo",
    img: "/yc_logo.jpg",
    description: "よみ得ポイント",
    icon: DatabaseIcon,
  },
  {
    name: "読売センター 東金東部",
    href: "/form?type=tobu",
    img: "/yc_logo.jpg",
    description: "よみ得ポイント",
    icon: DatabaseIcon,
  },
]
const supportLinks = [
  {
    name: "読売センター ゆりのき高津",
    href: "/form?type=takatsu",
    img: "/yc_logo.jpg",
    description: "よみ得ポイント",
    icon: DatabaseIcon,
  },
  {
    name: "森永ミルクセンター八千代",
    href: "/form?type=yachiyo",
    img: "/morinaga.png",
    description: "ミルモポイント",
    icon: DatabaseIcon,
  },
  {
    name: "森永ミルクセンター船橋",
    href: "/form?type=funabashi",
    img: "/morinaga.png",
    description: "ミルモポイント",
    icon: DatabaseIcon,
  },
]

export default function Index() {
  return (
    <div className="bg-white text-center">
      {/* Header */}

      <div className="relative pb-32 bg-gray-800">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src="/YC.jpg" alt="" />
          <div
            className="absolute inset-0 bg-yellow-600 mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            YCSポイントポータル
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300 mx-auto">
            毎月のお支払いでたまるお得なポイントをご確認いただけます。
          </p>
        </div>
      </div>

      {/* Overlapping cards */}
      <section
        className="-mt-32 max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
        aria-labelledby="contact-heading"
      >
        <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
          {supportLinks.map((link) => (
            <div
              key={link.name}
              className="flex flex-col bg-white rounded-2xl shadow-xl"
            >
              <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8 ">
                <div className="-ml-8 absolute top-0 p-5 inline-block bg-indigo-600 rounded-xl shadow-lg transform -translate-y-1/2">
                  <link.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900">
                  {link.name}
                </h3>
                {/* <p className="mt-4 text-base text-gray-500">{link.description}</p> */}
                <div className="pt-4">
                  <img src={link.img} className="h-8 inline-block" />
                  <span className="text-2xl ml-2">{link.description}</span>
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
                <Link href={link.href}>
                  <a className="text-base font-medium text-indigo-700 hover:text-indigo-600">
                    確認する<span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-8 mt-16">
          {togane.map((link) => (
            <div
              key={link.name}
              className="flex flex-col bg-white rounded-2xl shadow-xl"
            >
              <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8 ">
                <div className="-ml-8 absolute top-0 p-5 inline-block bg-indigo-600 rounded-xl shadow-lg transform -translate-y-1/2">
                  <link.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900">
                  {link.name}
                </h3>
                {/* <p className="mt-4 text-base text-gray-500">{link.description}</p> */}
                <div className="pt-4">
                  <img src={link.img} className="h-8 inline-block" />
                  <span className="text-2xl ml-2">{link.description}</span>
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
                <Link href={link.href}>
                  <a className="text-base font-medium text-indigo-700 hover:text-indigo-600">
                    確認する<span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
