import { useUser } from "@auth0/nextjs-auth0"
import { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Dialog, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"
import axios from "axios"
import CSVReader from "react-csv-reader"
import Link from "next/link"

const clientId = {
  "C8D9D207436A": "YCゆりのき高津",
  "1860248ADB3A": "YC東金東部",
  "E0D55E58DA97": "YC東金中央",
  "84A93E6D3AB1": "YCうすいNT",
  "C8D9D207436A": "YC緑が丘",
}

export default function Admin() {
  const [dept, setDept] = useState("-")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [csv, setCsv] = useState([])
  const router = useRouter()
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  function csvUpload() {
    setLoading(true)
    axios.post("/api/upload", csv).then((res) => {
      setOpen(true)
      setLoading(false)
    })
  }

  function csvParse(data, fileInfo) {
    const result = data.map((v) => {
      return v["クライアントID"]
        ? {
            dept: clientId[v["クライアントID"]],
            code: v["購読者番号"],
            name: v["氏名"],
            add1: v["都道府県・市区名"] + v["住所(町名)"] + v["住所(丁番号)"],
            add2: v["建物"],
            point: v["ポイント"],
          }
        : {
            dept: v["店舗名"],
            code: parseInt(v["顧客コード"]).toString(), //v["顧客コード"],
            name: v["顧客名"],
            add1: v["住所1"],
            add2: v["住所2"],
            point: v["当月累計ポイント"],
          }
    })
    setCsv(result)
  }

  if (user) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mt-8">
            <span className="block">ヘッダー入りのCSVファイルを</span>
            <span className="block">アップロードしてください</span>
          </h2>
          <div className="mt-8 w-full inline-flex items-center justify-center">
            <Select setDept={setDept} />
          </div>
          {dept !== "-" && <Upload csvParse={csvParse} />}
          {csv.length > 0 && (
            <div className="py-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={(e) => csvUpload()}
              >
                {loading && (
                  <div className="mr-2 -ml-2">
                    <svg
                      className="animate-spin   h-5 w-5 text-white inline-block "
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
                アップロード
              </button>
            </div>
          )}

          <Modal setOpen={setOpen} open={open} dept={dept} />
          <Link href="/">
            <a className="block mt-8 text-center text-blue-500 underline">
              ホームへ戻る
            </a>
          </Link>
        </div>
      </div>
    )
  }
  return (window.location.href = `/api/auth/login?returnTo=${router.asPath}`)
}

function Select({ setDept }) {
  return (
    <div>
      <label
        htmlFor="location"
        className="text-left block text-sm font-medium text-gray-700"
      >
        店舗
      </label>
      <select
        id="location"
        name="location"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        defaultValue="-"
        onChange={(e) => setDept(e.target.value)}
      >
        <option>-</option>
        <option>YCゆりのき高津</option>
        <option>ミルク八千代</option>
        <option>ミルク船橋</option>
        <option>YC東金中央</option>
        <option>YC東金東部</option>
        <option>YCうすいNT</option>
        <option>YC緑が丘</option>
      </select>
    </div>
  )
}

function Upload({ csvParse }) {
  return (
    <div className="py-8">
      <CSVReader
        parserOptions={{ header: true, skipEmptyLines: true }}
        fileEncoding="sjis"
        onFileLoaded={csvParse}
      />
    </div>
  )
}

function Modal({ open, setOpen, dept }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    正常にアップロードしました
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {dept}のデータは最新の顧客情報に更新されました。
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  閉じる
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
