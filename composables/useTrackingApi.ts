export default async function (endpoint: string, {method, body, auth = true }: {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
  body?: { [key: string]: string }
  auth?: boolean
}) {

  try {

      const config = useRuntimeConfig().public

      const response = await fetch(`${config.apiTrackingBaseUrl}${endpoint}`, {
          method,
          headers: {
              'content-type': 'application/json',
              ...auth && { Authorization: `Bearer ${useCookie('api_tracking_jwt').value}` }
          },
          ...body && {
              body: JSON.stringify(body)
          }
      })

      if (!response.ok) throw new Error('Une erreur est survenue')

      return await response.json()

  } catch (err) {
      return null
      console.log(err)
  }
}