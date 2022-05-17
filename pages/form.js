import Link from "next/link"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useEffect, useState } from "react"
import PointPage from "../components/PointPage2"
import { useRouter } from "next/router"
import Footer from "../components/Footer"

export default function Form() {
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [yc, setYc] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (['takatsu', 'chuo', 'tobu', 'usui'].includes(router.query.type)) {
      setYc(true)
    }
  }, [])

  const onSubmit = (data) => {
    // console.log(data);
    setLoading(true)
    axios
      .post(`/api/customers/${data.code}`, { ...router.query, name: data.name })
      .then((r) => {
        console.log(r);
        if (r.data.name === 404) {
          setCustomer(404)
        } else {
          setCustomer(r.data)
        }
        setLoading(false)
      })
  }

  const locals = {
    onSubmit,
    customer,
    loading,
    yc,
  }

  return customer && customer !== 404 ? <PointPage {...locals} /> : <Home {...locals} />
}

function Home({ onSubmit, customer, loading, yc }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {loading && (
        <div className=" absolute left-1/2">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-black inline-block "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx={12}
              cy={12}
              r={10}
              stroke="currentColor"
              strokeWidth={4}
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <p className="text-center text-3xl font-bold">
          <img
            className="mx-auto h-9 w-auto inline-block mr-1"
            src={yc ? "/yc_logo.jpg" : "/morinaga.png"}
            alt=""
          />
          {yc ? "" : "森永ミルクセンター"}
        </p>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {yc ? "よみ得ポイント" : "ミルモポイント"}確認
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600"></p>
        <p className="text-center font-medium text-indigo-600 hover:text-indigo-500">
          {yc ? "購読者番号" : "お客様コード"}を入力してください
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                {yc ? "購読者番号" : "お客様コード(例000111→111だけ入力する)"}
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  {...register("code", { required: true })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.code && (
                  <span className="text-red-500 text-sm">入力してください</span>
                )}
                {customer === "" && (
                  <p className="text-red-500 text-sm mt-2">
                    該当する顧客コードがありません
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                お名前
                <span className="text-xs ml-1">苗字(姓)</span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  {...register("name", { required: true })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.code && (
                  <span className="text-red-500 text-sm">入力してください</span>
                )}
                {customer === 404 && (
                  <p className="text-red-500 text-sm mt-2">
                    お名前を確認してください。
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                送信
              </button>
            </div>
          </form>
        </div>
        <Link href="/">
          <a className="block mt-8 text-center text-blue-500 underline">
            ホームへ戻る
          </a>
        </Link>
      </div>
      <Footer />
    </div>
  )
}
