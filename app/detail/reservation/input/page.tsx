'use client'

// 必要なコンポーネントをインポート
import { useForm, SubmitHandler } from "react-hook-form"
import Link from "next/link"
import { useRouter } from 'next/navigation';

// よくわかってないけど、入力フォームの名前をstringとしてリスト定義
type Inputs = {
  lastName: string
  firstName: string
  mailAddress: string
  phoneNumber: string
}

export default function Home() {

  const router = useRouter(); 

  // useFormでフォーム部品を生成
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  // onSubmitで呼び出す関数リテラルを定義（SubmitHandlerで生成）　中身はデータをログに出すだけ
  // なぜかformをサブミット（actionで指定されたパスへ遷移）する方法も、
  // router.pushにフォームをパラメータとして渡す方法も検索できなかったので、
  // やむなくリクエストパラメータにフォームの内容を転記。
  // ただし、本番では個人情報が流れるので、絶対にNG
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    router.push("/detail/reservation/check?"
                + "lastName=" + data.lastName + "&"
                + "firstName=" + data.firstName + "&"
                + "mailAddress=" + data.mailAddress + "&"
                + "phoneNumber=" + data.phoneNumber
    );
  }

  return (
    <main className="container flex flex-col mx-auto min-h-screen px-20">
    {/*<main className="flex flex-col min-h-screen px-24 py-12 bg-gray-cube">*/}
      {/* タイトルエリア */}
      <div className="my-4 mx-2">
        <h1 className="text-3xl font-semibold text-blue-cube">内覧予約</h1>
        <p><Link href="/" className="text-green-cube">よくあるご質問</Link>でもご案内しております。</p>
      </div>

      {/* 直線 */}
      <hr/>

      {/* ステップエリア */}
      <div className="my-4 mx-2">
        <ul className="step">
          <li className="current">入力</li>
          <li >内容確認</li>
          <li className="last">完了</li>
        </ul>
      </div>

      {/* 見出しエリア */}
      {/* 部屋情報エリア */}


      {/* 入力エリア onSubmit={handleSubmit(onSubmit)} */}
      <div className="md:flex md:items-center mb-6">
      <form className="w-full max-w-2xl" action="/detail/reservation/check" onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-last-name"
              >
                姓
                <text className="text-white bg-red-500 font-normal text-sm ml-2 p-0.5 rounded-md">
                  必須
                </text>
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                defaultValue=""
                placeholder="姓"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && <span>この項目は必須入力です。</span>}
            </div>
          </div>
          
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-first-name"
              >
                名
                <text className="text-white bg-red-500 font-normal text-sm ml-2 p-0.5 rounded-md">
                  必須
                </text>
              </label>
            </div>

            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                defaultValue=""
                placeholder="名"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && <span>この項目は必須入力です。</span>}            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                メールアドレス
                <text className="text-white bg-red-500 font-normal text-sm ml-2 p-0.5 rounded-md">
                  必須
                </text>
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                defaultValue=""
                placeholder="例) example@gmail.me"
                {...register("mailAddress", { 
                  required: "メールを入力してね",  
                  pattern: {value:/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                            message:"ちゃんとしたメールアドレス形式で入力してね"}
                })}
              />
              {errors.mailAddress && <span>{errors.mailAddress.message}</span>}
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                電話番号
                <text className="text-white bg-red-500 font-normal text-sm ml-2 p-0.5 rounded-md">
                  必須
                </text>
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                defaultValue=""
                placeholder="例) 03-1234-5678"
                {...register("phoneNumber", { required: true })}
              />
              {errors.phoneNumber && <span>この項目は必須入力です。</span>}
            </div>
          </div>
          <div className="flex justify-center">
            {/*
            {isSubmitted ? (
              <div>
                <p className="text-green-500 text-lg text-bold">
                  お問合せを送信いたしました。
                </p>
              </div>
            ) : (*/}
              <button
                className={
                  "py-3 lg:py-3 px-14 lg:px-14 text-white-500 font-bold rounded-3xl bg-blue-400 hover:shadow-teal-md transition-all outline-none text-white"
                }
                type="submit"
              >
                送信
              </button>
            {/* )}*/}
          </div>
        </form>

      </div>
    </main>
  )
}
