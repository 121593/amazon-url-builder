import test from 'ava'
import { AmazonUrlBuilder } from '../src'

test('Build a Node Url', t => {
  const nodeId = '2811119011'
  const expectedUrl = `https://www.amazon.com/b/?node=${nodeId}`
  const params = { a: 'b', language: 'es' }
  const expectedUrlWithParams = `https://www.amazon.com/b/?node=${nodeId}&a=b&language=es`

  t.is(expectedUrl, AmazonUrlBuilder.buildUrlNodeById(nodeId))
  t.is(expectedUrlWithParams, AmazonUrlBuilder.buildUrlNodeById(nodeId, params))
})

test('Build a product Url', t => {
  const productId = 'B07SR5JC4T'
  const expectedUrl = `https://www.amazon.com/dp/${productId}`
  const params = { a: 'b', language: 'es' }
  const expectedUrlWithParams = `https://www.amazon.com/dp/${productId}?a=b&language=es`

  t.is(expectedUrl, AmazonUrlBuilder.buildUrlProductById(productId))
  t.is(expectedUrlWithParams, AmazonUrlBuilder.buildUrlProductById(productId, params))
})

test('Build a Node bestsellers Url', t => {
  const catSlug = 'sporting-goods'
  const expectedUrl = `https://www.amazon.com/gp/bestsellers/${catSlug}`
  const params = { a: 'b', language: 'es' }
  const expectedUrlWithParams = `https://www.amazon.com/gp/bestsellers/${catSlug}?a=b&language=es`

  t.is(expectedUrl, AmazonUrlBuilder.buildUrlBestSellerByNodeSlug(catSlug))
  t.is(expectedUrlWithParams, AmazonUrlBuilder.buildUrlBestSellerByNodeSlug(catSlug, params))
})

test('Build a search Url', t => {
  const searchTerm = 'product'
  const expectedUrl = `https://www.amazon.com/s?k=${searchTerm}`
  const params = { a: 'b', language: 'es' }
  const expectedUrlWithParams = `https://www.amazon.com/s?k=${searchTerm}&a=b&language=es`

  t.is(expectedUrl, AmazonUrlBuilder.buildUrlSearchByTerm(searchTerm))
  t.is(expectedUrlWithParams, AmazonUrlBuilder.buildUrlSearchByTerm(searchTerm, params))
})

test('Build a category search Url', t => {
  const searchTerm = 'product'
  const i = 'audible'
  const expectedUrl = `https://www.amazon.com/s?k=${searchTerm}&i=${i}`
  const params = { a: 'b', language: 'es' }
  const expectedUrlWithParams = `https://www.amazon.com/s?k=${searchTerm}&i=${i}&a=b&language=es`

  t.is(expectedUrl, AmazonUrlBuilder.buildUrlSearchByTermAndCategory(searchTerm, i))
  t.is(expectedUrlWithParams, AmazonUrlBuilder.buildUrlSearchByTermAndCategory(searchTerm, i, params))
})
