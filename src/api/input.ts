import request from '../utils/request'
import type { ApiResponse } from './auth'

export interface UploadResumeRequest {
  input_type: 'pdf' | 'text' | 'voice'
  text_content?: string
  file?: File
  need_extra_test: boolean
}

export interface UploadResumeResponseData {
  resume_id: string
  parsed_skills: string[]
  suggest_test: boolean
}

export const uploadResumeAPI = (payload: UploadResumeRequest) => {
  const formData = new FormData()

  formData.append('input_type', payload.input_type)
  formData.append('need_extra_test', String(payload.need_extra_test))

  if (payload.text_content) {
    formData.append('text_content', payload.text_content)
  }

  if (payload.file) {
    formData.append('file', payload.file)
  }

  return request.post<ApiResponse<UploadResumeResponseData>, ApiResponse<UploadResumeResponseData>>(
    '/api/v1/input/resume',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}
