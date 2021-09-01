import { CheckCircleIcon } from '@heroicons/react/solid'

const includedFeatures = [
  'ミルモポイントを毎月進呈いたします',
  'ご長寿お祝いポイントのプレゼント',
]

const bokashi = {
  color: 'transparent',
  textShadow: '0px 0px 8px #000'
}

export default function PointPage({customer}) {
// name
// zip
// addr1
// addr2
// tel

// const splited = customer.addr1.split('-') || customer.addr1
// const addr1 = splited[0] 
// const addr2  = "-" + splited[1] + "-" + splited[2] + customer.addr2

  return (
    <div className="bg-gray-100">
      <div className="pt-12 sm:pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">No. {customer.code}</h2> */}
            <h3 className="text-2xl font-extrabold text-gray-900 py-8">{customer.name.split('　')[0]}&nbsp;<span style={ bokashi }>{customer.name.split('　')[1]}</span>様</h3>
            {/* <p className="mt-4 text-xl text-gray-600">
              If you're not satisfied, contact us within the first 14 days and we'll send you a full refund.
            </p> */}
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-100" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
              <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                {/* <p  className="text-xl mt-2">{customer.zip}&nbsp;{addr1} <span style={bokashi} className="text-xl mt-2">{addr2} </span></p> */}
                {/* <p className="mt-6 text-base text-gray-500">
                  毎月のお支払いの100円(税別)ごとに1ポイント進呈いたします。ポイント数は毎月の領収書と御請求明細書に印字されますので､ご確認ください｡ ※宅配が中止になるとポイントは失効となります。(ポイントの累積上限は､1800ポイントまで）
                </p> */}
                <div className="mt-8">
                  <div className="flex items-center">
                    <img src="/yomitoku.jpg" />
                    {/* <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600">
                      お得なポイント
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200" /> */}
                  </div>
                  {/* <ul className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                    {includedFeatures.map((feature) => (
                      <li key={feature} className="flex items-start lg:col-span-1">
                        <div className="flex-shrink-0">
                          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-sm text-gray-700">{feature}</p>
                      </li>
                    ))}
                  </ul> */}
                </div>
              </div>
              <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                <p className="text-lg leading-6 font-medium text-gray-900">ミルモポイント</p>
                <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
                  <span>{customer.point.toLocaleString()}</span>
                  <span className="ml-1 mt-4 text-xl font-medium text-gray-500">ポイント</span>
                </div>
                <div className="mt-6">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900"
                    >
                      &#x260e; <span className="ml-2">0120-625-605</span>
                    </a>
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  お気軽にお問い合わせください。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
