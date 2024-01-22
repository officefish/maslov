import {
  useAxiosFetcher_GET,
  useAxios_GET_QueryParams,
  useAxios_POST_RawData_Redirect,
} from './axios.service'
import useSWR from 'swr'
import { SubmitHandler } from 'react-hook-form'
import { FieldValues } from 'react-hook-form'
import { User } from '@client/models/user.model'
//import { useState } from "react"
const HOST = 'localhost'
const PORT = 8001

import { Dispatch, SetStateAction } from 'react'
import axios from 'axios'

const API_PREFIX = 'api/v1/user'

export function useUser() {
  const route = 'me'
  const key = `${API_PREFIX}/${route}`

  const { fetcher } = useAxiosFetcher_GET({ api: API_PREFIX, route })

  const { data: user, error, isValidating, mutate } = useSWR<User>(key, fetcher)

  return { user, error, isValidating, mutate }
}

type ForgotPasswordHookProps = {
  setEmail: Dispatch<SetStateAction<string>>
}

export const useResetPassword = () => {
  const { onSubmit, serverError } = useAxios_POST_RawData_Redirect({
    api: API_PREFIX,
    route: 'reset',
    redirect: 'auth/sign-in',
  })
  return { onSubmit, serverError }
}

export const useForgotPassword = <T = object>({
  setEmail,
}: ForgotPasswordHookProps) => {
  const {
    onSubmit: onSubmitMiddleware,
    reply,
    serverError,
  } = useAxios_GET_QueryParams<T>({
    api: API_PREFIX,
    route: 'forgot-password',
  })

  const onSubmit: SubmitHandler<FieldValues> = async ({ email }) => {
    onSubmitMiddleware(email)
    setEmail(email)
  }

  return { onSubmit, reply, serverError }
}

export const getUserProfilebyDomain = async <T = object>({
  protocol = 'http',
  host = HOST,
  port = PORT,
  api = API_PREFIX,
  route = 'domain',
  headers = {
    'Content-Type': 'application/json',
  },
  withCredentials = true,
  params = {},
  value = '',
} = {}): Promise<T | null> => {
  const url = `${protocol}://${host}:${port}/${api}/${route}/${value}`
  return await axios
    .get(url, {
      headers: { ...headers },
      withCredentials: withCredentials,
      params: { ...params },
    })
    .then((response) => response.data)
    .catch(() => {
      /*console.log(error)*/
      return null
    })
}
