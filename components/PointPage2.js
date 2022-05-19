import Footer from "../components/Footer"
import Link from "next/link"
// const bokashi = {
//   color: "transparent",
//   textShadow: "0px 0px 8px #000",
// }
export default function PointPage2({ customer, yc }) {
  return (
    <div className="bg-gray-50 pt-12 sm:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-extrabold text-gray-900 py-8">
            {customer.name.split("　")[0]}&nbsp;
            <span>{customer.name.split("　")[1]}</span>様
            {/* <span style={bokashi}>{customer.name.split("　")[1]}</span>様 */}
          </h3>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            お客様の現在の保有ポイントです。
          </p>
        </div>
      </div>
      <div className="mt-10 pb-12 bg-white sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
              <dl className="rounded-lg bg-white shadow-lg ">
                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    {yc ? "よみ得ポイント" : "ミルモポイント"}
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                    {customer.point}
                  </dd>
                </div>
              </dl>
            </div>
            <div className=" py-8 text-center">
              <img
                className="mx-auto"
                // src={yc ? "yomitoku.jpg" : "milk.jpg"}
                src={yc === "usui" ? "usuint.jpg" : yc === true ? "yomitoku.jpg" : "milk.jpg"}
                alt=""
              />
            </div>

            <Link href="/">
              <a className="block mt-8 text-center text-blue-500 underline">
                ホームへ戻る
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white text-center mx-auto">
        <Footer />
      </div>
    </div>
  )
}
