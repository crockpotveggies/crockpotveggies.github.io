---
layout: post
title: Building Functional API Clients
---

Thanks to Scala's functionalism, I quickly whipped up an API client for Silota for an integration at work.

If you haven't seen it before, [Scala Dispatch](http://dispatch.databinder.net/Dispatch.html) is an awesome HTTP client for simple requests. It's built on top of Java's async-http-client. I was able to access some of its features to build a functional client that also allowed me to handle errors in Scala fashion.

I put Scala's implicits to work. When defining API methods I wanted to include typed responses so I could automatically deserialize the response. I was able to develop a clean method like so:

<pre>
def create(engineId: String, data: String) = {
  r[Topic](POST, silotaUrl+"engine/"+engineId+"/topics/", data)
}
</pre>

I purposely left the <code>data</code> param as a string since data is already serialized to JSON before being passed in. I may change that in the future. So what's under the hood?

<pre>
abstract class SilotaResource extends ApiResource {
  
  val silotaUrl = "https://api.silota.com/v1/"
  
  val headers = Map(
      "Authorization" -> "Basic API_KEY",
      "Content-Type" -> "application/json")
  
  private def getResult(request: dispatch.Future[com.ning.http.client.Response]): Either[Throwable, Option[String]] = {
    val response = request()
    response.getStatusCode match {
      case 200 =>     Right(Some(response.getResponseBody))
      case 201 =>     Right(Some(response.getResponseBody))
      case 202 =>     Right(Some(response.getResponseBody))
      case 204 =>     Right(None)
      case 404 =>     Right(None)
      case 400 =>     Left(new IOException(response.getResponseBody))
      case 500 =>     Left(new IOException(response.getResponseBody))
      case _ =>       Left(new IOException(response.getResponseBody))
    }
  }
  
  private def handleResult[T](result: dispatch.Future[com.ning.http.client.Response]) = getResult(result) match {
    case Left(error) => new ApiResult[T](None, Some(error))
    case Right(content) => new ApiResult[T](content, None)
  }
  
  override def r[T](method: String, urlString: String, data: String="")(implicit m: Manifest[T]): ApiResult[T] = method match {
    case GET => handleResult(Http(url(urlString) <:< headers))
    case POST => handleResult(Http(url(urlString).POST << data <:< headers))
    case PUT => handleResult(Http(url(urlString).PUT << data <:< headers))
    case DELETE => handleResult(Http(url(urlString).DELETE <:< headers))
  }
  
}
</pre> 

Thanks to Scala Dispatch I was able to pattern match against the response codes and format the response into an <code>Either</code> where the result is finally passed into an <code>ApiResult</code>. I can't show the result class since it is proprietary, but I can say it conveniently has built-in methods for easy pattern matching and error handling.

<pre>case 404 =>     Right(None)</pre>

With the above I treat a <code>404</code> error as a Scala <code>Right</code>. This was purely by design. In the result class I later have the ability to treat the requested object as an Option. It's a workflow more similar to key/value storage which is a personal preference.

What gains did I get with the above? A very easy-to-read class that also allows me to add further pattern matching for future cases where I need to handle non-typical HTTP result codes.