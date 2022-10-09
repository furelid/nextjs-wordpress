import {GetStaticProps} from 'next'
import Article from '~/components/Article'
import Layout from '~/components/Layout'
import {client} from '~/lib/helpers'
import {SINGLE_PAGE_QUERY} from '~/lib/queries'
import {PageProps} from '~/lib/types'
import {Container} from "@mantine/core";

/**
 * Homepage component.
 *
 * This component displays the homepage content.
 */
export default function HomePage({data}: PageProps) {
  return (
    <>
      <Layout
        settings={data?.generalSettings}
        menu={data?.menu}
        footerMenu={data?.footerMenu}
        seo={data?.page?.seo}
      >
        <Container>
          <Article content={data?.page} /></Container>
      </Layout>
    </>

  )
}

/**
 * Query data and pass it to the page component.
 *
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 */
export const getStaticProps: GetStaticProps = async () => {
  // Query the homepage data.
  const {data} = await client.query({
    query: SINGLE_PAGE_QUERY,
    variables: {slug: 'homepage'}
  })

  // Pass data to the page via props.
  return {
    props: {
      data
    },
    revalidate: false
  }
}
