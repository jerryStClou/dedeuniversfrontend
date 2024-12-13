
import { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import axios from "axios";
import { ProductImages } from "@/types/types";

type PropsProductImageDetail = {
  productId: number | undefined;
  numeroImage: number | undefined;  
  mouseEnter1: () => void | undefined;
  mouseEnter2: () => void | undefined;
  mouseEnter3: () => void | undefined;
  mouseEnter4: () => void | undefined;
  mouseEnter5: () => void | undefined;
  mouseEnter6: () => void | undefined;
  mouseEnter7: () => void | undefined;
};

export default function ProductImageDetail({productId,mouseEnter1,mouseEnter2,mouseEnter3,mouseEnter4,mouseEnter5,mouseEnter6,mouseEnter7,numeroImage}:PropsProductImageDetail){
  
  const [productImages, setProductImages] = useState<ProductImages[]>([
    {
      "id":1,
      "productImages":"https://m.media-amazon.com/images/S/aplus-media-library-service-media/1130a6c8-f261-4a7c-9101-30932e5ea558.__CR0,0,970,600_PT0_SX970_V1___.jpg",
      "typeProductImages":"card",
      "product":null
    },
    {
      "id":1,
      "productImages":"https://m.media-amazon.com/images/S/aplus-media-library-service-media/8e33a0e9-7fdc-46a1-87e9-e995b1594eff.__CR0,0,970,600_PT0_SX970_V1___.jpg",
      "typeProductImages":"card",
      "product":null
    },
    {
      "id":1,
      "productImages":"https://m.media-amazon.com/images/S/aplus-media-library-service-media/f6d5ee9c-5a8d-4b00-ae7f-27b180f63354.__CR0,0,970,600_PT0_SX970_V1___.jpg",
      "typeProductImages":"card",
      "product":null
    },
    {
      "id":1,
      "productImages":"https://m.media-amazon.com/images/S/aplus-media-library-service-media/71a3790a-07fd-4cba-910c-c3df8b4f5f80.__CR0,0,970,600_PT0_SX970_V1___.jpg",
      "typeProductImages":"card",
      "product":null
    }
  ]);
   
// useEffect(() => {
//   const fetchProduct = async () => {
//     try {
//       const response = await axios.get(`http://localhost:9196/api/productImage/all/${productId}`);
//       setProductImages(response.data);
//     } catch (error) {
//       console.error('Error fetching product images:', error);
//     }
//   };

//   fetchProduct();
// }, [productId]);


  return(
      <>
      <div className={classes.imageProduct}>
                  <div className={classes.theImageProduct}>
                    {
                      productImages && productImages[0] !== undefined ? (
                          <img
                              className={numeroImage != 1 ? classes.invisible : ""}
                              src={productImages[0].productImages}
                              alt=""
                              srcSet=""
                              />
                          ) : null
                    }
                  
                  {
                      productImages && productImages[1] !== undefined ? (
                          <img
                              className={numeroImage != 2 ? classes.invisible : ""}
                              src={productImages[1].productImages}
                              alt=""
                              srcSet=""
                              />
                          ) : null
                    }
                    
                    {
                      productImages && productImages[2] !== undefined ? (
                          <img
                              className={numeroImage != 3 ? classes.invisible : ""}
                              src={productImages[2].productImages}
                              alt=""
                              srcSet=""
                              />
                          ) : null
                    }
                    
                    {
                      productImages && productImages[3] !== undefined ? (
                          <img
                              className={numeroImage != 4 ? classes.invisible : ""}
                              src={productImages[3].productImages}
                              alt=""
                              srcSet=""
                              />
                          ) : null
                    }
                    
                    {
                      productImages && productImages[4] !== undefined ? (
                          <img
                              className={numeroImage != 5 ? classes.invisible : ""}
                              src={productImages[4].productImages}
                              alt=""
                              srcSet=""
                              />
                          ) : null
                    }
                    
                    {
                      productImages && productImages[5] !== undefined ? (
                          <img
                              className={numeroImage != 6 ? classes.invisible : ""}
                              src={productImages[5].productImages}
                              alt=""
                              srcSet=""
                              />
                          ) : null
                    }
                    
                    {
                      productImages && productImages[6] !== undefined ? (
                          <img
                              className={numeroImage != 7 ? classes.invisible : ""}
                              src={productImages[6].productImages}
                              alt=""
                              srcSet=""
                              />
                          ) : null
                    }
                  
                  </div>
                  
                  <div className={classes.carousselProduct}>

                      <div className={classes.theCarousselProduct}>
                          <div className={classes.imagesCarousselProduct}>
                              {
                                productImages && productImages[0] !== undefined?
                                (
                                  <div className={classes.imageCaroussel} onMouseEnter={mouseEnter1}>
                                    <img src={productImages[0].productImages} alt="" />
                                  </div>
                                ):(null)
                              }

                              
                              {
                                productImages && productImages[1] !== undefined?
                                (
                                  <div className={classes.imageCaroussel} onMouseEnter={mouseEnter2}>
                                    <img src={productImages[1].productImages} alt="" />
                                  </div>
                                ):(null)
                              }


                              
                              {
                                productImages && productImages[2] !== undefined?
                                (
                                  <div className={classes.imageCaroussel} onMouseEnter={mouseEnter3}>
                                    <img src={productImages[2].productImages} alt="" />
                                  </div>
                                ):(null)
                              }

                      
                              
                              {
                                productImages && productImages[3] !== undefined?
                                (
                                  <div className={classes.imageCaroussel} onMouseEnter={mouseEnter4}>
                                    <img src={productImages[3].productImages} alt="" />
                                  </div>
                                ):(null)
                              }

                              
                              
                              {
                                productImages && productImages[4] !== undefined?
                                (
                                  <div className={classes.imageCaroussel} onMouseEnter={mouseEnter5}>
                                    <img src={productImages[4].productImages} alt="" />
                                  </div>
                                ):(null)
                              }

                              
                              
                              {
                                productImages && productImages[5] !== undefined?
                                (
                                  <div className={classes.imageCaroussel} onMouseEnter={mouseEnter6}>
                                    <img src={productImages[5].productImages} alt="" />
                                  </div>
                                ):(null)
                              }

                              
                              {
                                productImages && productImages[6] !== undefined?
                                (
                                  <div className={classes.imageCaroussel} onMouseEnter={mouseEnter7}>
                                    <img src={productImages[6].productImages} alt="" />
                                  </div>
                                ):(null)
                              }

                      
                         </div>
                      </div>
                      {/*                 
                      <button>
                          <img src={image3} alt="" />
                      </button> */}

              
                  </div>
              </div>
      </>
  )
}