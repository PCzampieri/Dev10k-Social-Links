import React from "react";
import Prismic from "prismic-javascript";
import Head from 'next/head'

const Index = ({ data }) => {
  return (
    <div
    style={{
      backgroundColor: data.corfundo,
      color: data.cortexto,
    }}
    >    
      <Head>
  <title>{data.pagetitle}</title>
      </Head>
      <div className='w-1/2 mx-auto text-center'>
  <h1 className="font-bold text-4xl p-8">{data.title}</h1>
      <img src={data.logo.url} className="mx-auto rounded-full shadow-2xl w-1/4" alt=""/>
    
        {data.body.map((item) => {
          if (item.slice_type === "secao") {
            return <h2 className="font-bold text-2xl pt-4">{item.primary.nome}</h2>;
          }
          if (item.slice_type === "link") {
            return (
              <div>
                <a className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 inline-block' href={item.primary.destino.url}>
                  {item.primary.texto_do_botao}
                </a>
              </div>
            );
          }
          if (item.slice_type === "imagem") {
            return (
              
                <img src={item.primary.imagem.url} className='mx-auto' alt="" />
           
            );
          }
          return null;
        })}
   
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const client = Prismic.client("https://zamptech.cdn.prismic.io/api/v2");
  const centralLinks = await client.getSingle("centrallinks");

  return {
    props: {
      data: centralLinks.data,
    },
  };
}

export default Index;
