// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { ColorRing } from "react-loader-spinner";
// import { currencyFormat } from "../../utils/number";
// import "./style/productDetail.style.css";
// import { getProductDetail } from "../../features/product/productSlice";
// import { addToCart } from "../../features/cart/cartSlice";

// const ProductDetail = () => {
//   const dispatch = useDispatch();
//   const { selectedProduct, loading } = useSelector((state) => state.product);
//   const [size, setSize] = useState("");
//   const { id } = useParams();
//   const [sizeError, setSizeError] = useState(false);
//   const user = useSelector((state) => state.user.user);
//   const navigate = useNavigate();

//   const addItemToCart = () => {
//     //사이즈를 아직 선택안했다면 에러
//     if(size ===""){
//       setSizeError(true);
//       return;
//     }
//     // 아직 로그인을 안한유저라면 로그인페이지로
//     if(!user) {
//       navigate("/login");
//     }
//     // 카트에 아이템 추가하기
//     dispatch(addToCart({id,size}));
//   };
//   const selectSize = (value) => {
//     // 사이즈 추가하기
//     console.log("size value",value);
//     if(sizeError) setSizeError(false);
//     setSize(value);

//   };

//   useEffect(() => {
//     dispatch(getProductDetail(id));
//   }, [id, dispatch]);

//   if (loading || !selectedProduct)
//     return (
//       <ColorRing
//         visible={true}
//         height="80"
//         width="80"
//         ariaLabel="blocks-loading"
//         wrapperStyle={{}}
//         wrapperClass="blocks-wrapper"
//         colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
//       />
//     );
//   return (
//     <Container className="product-detail-card">
//       <Row>
//         <Col sm={6}>
//           <img src={selectedProduct.image} className="w-100" alt="image" />
//         </Col>
//         <Col className="product-info-area" sm={6}>
//           <div className="product-info">{selectedProduct.name}</div>
//           <div className="product-info">
//             ₩ {currencyFormat(selectedProduct.price)}
//           </div>
//           <div className="product-info">{selectedProduct.description}</div>

//           <Dropdown
//             className="drop-down size-drop-down"
//             title={size}
//             align="start"
//             onSelect={(value) => selectSize(value)}
//           >
//             <Dropdown.Toggle
//               className="size-drop-down"
//               variant={sizeError ? "outline-danger" : "outline-dark"}
//               id="dropdown-basic"
//               align="start"
//             >
//               {size === "" ? "사이즈 선택" : size.toUpperCase()}
//             </Dropdown.Toggle>

//             <Dropdown.Menu className="size-drop-down">
//               {Object.keys(selectedProduct.stock).length > 0 &&
//                 Object.keys(selectedProduct.stock).map((item, index) =>
//                   selectedProduct.stock[item] > 0 ? (
//                     <Dropdown.Item eventKey={item} key={index}>
//                       {item.toUpperCase()}
//                     </Dropdown.Item>
//                   ) : (
//                     <Dropdown.Item eventKey={item} disabled={true} key={index}>
//                       {item.toUpperCase()}
//                     </Dropdown.Item>
//                   )
//                 )}
//             </Dropdown.Menu>
//           </Dropdown>
//           <div className="warning-message">
//             {sizeError && "사이즈를 선택해주세요."}
//           </div>
//           <Button variant="dark" className="add-button" onClick={addItemToCart}>
//             추가
//           </Button>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ProductDetail;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // 별 아이콘
import { ColorRing } from "react-loader-spinner";
import { currencyFormat } from "../../utils/number";
import { getProductDetail } from "../../features/product/productSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { addReview } from "../../features/review/reviewSlice"; // 리뷰 추가 액션

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { selectedProduct, loading } = useSelector((state) => state.product);
  const [size, setSize] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const [rating, setRating] = useState(0); // 별점 상태
  const [reviewText, setReviewText] = useState(""); // 리뷰 텍스트 상태
  const [showReviewModal, setShowReviewModal] = useState(false); // 리뷰 모달 상태
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const addItemToCart = () => {
    if (size === "") {
      setSizeError(true);
      return;
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(addToCart({ id, size }));
  };

  const selectSize = (value) => {
    if (sizeError) setSizeError(false);
    setSize(value);
  };

  const handleReviewSubmit = () => {
    if (rating === 0 || reviewText.trim() === "") {
      alert("별점과 리뷰를 모두 입력해 주세요.");
      return;
    }

    const review = {
      rating,
      text: reviewText,
      userId: user.id,
      date: new Date().toISOString(),
    };

    dispatch(addReview({ productId: id, review }));
    setShowReviewModal(false);
  };

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [id, dispatch]);

  if (loading || !selectedProduct)
    return (
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    );

  return (
    <Container className="product-detail-card">
      <Row>
        <Col sm={6}>
          <img src={selectedProduct.image} className="w-100" alt="image" />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-info">{selectedProduct.name}</div>
          <div className="product-info">
            ₩ {currencyFormat(selectedProduct.price)}
          </div>
          <div className="product-info">{selectedProduct.description}</div>

          <Dropdown
            className="drop-down size-drop-down"
            title={size}
            align="start"
            onSelect={(value) => selectSize(value)}
          >
            <Dropdown.Toggle
              className="size-drop-down"
              variant={sizeError ? "outline-danger" : "outline-dark"}
              id="dropdown-basic"
              align="start"
            >
              {size === "" ? "사이즈 선택" : size.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu className="size-drop-down">
              {Object.keys(selectedProduct.stock).length > 0 &&
                Object.keys(selectedProduct.stock).map((item, index) =>
                  selectedProduct.stock[item] > 0 ? (
                    <Dropdown.Item eventKey={item} key={index}>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item eventKey={item} disabled={true} key={index}>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  )
                )}
            </Dropdown.Menu>
          </Dropdown>
          <div className="warning-message">
            {sizeError && "사이즈를 선택해주세요."}
          </div>
          <Button variant="dark" className="add-button" onClick={addItemToCart}>
            추가
          </Button>

          {/* 리뷰 작성 버튼 */}
          <Button variant="outline-dark" className="mt-3" onClick={() => setShowReviewModal(true)}>
            리뷰 작성
          </Button>

          {/* 리뷰 작성 모달 */}
          <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>리뷰 작성</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>별점</Form.Label>
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        onClick={() => setRating(i + 1)}
                        style={{ cursor: "pointer", fontSize: "1.5rem" }}
                      >
                        {i < rating ? <FaStar /> : <FaRegStar />}
                      </span>
                    ))}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>리뷰</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="리뷰를 작성해주세요."
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleReviewSubmit}>
                  리뷰 제출
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          {/* 리뷰 목록 */}
          <div>
            <h4>리뷰</h4>
            {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
              selectedProduct.reviews.map((review, index) => (
                <div key={index}>
                  <div>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    {Array.from({ length: 5 - review.rating }).map((_, i) => (
                      <FaRegStar key={i} />
                    ))}
                  </div>
                  <p>{review.text}</p>
                </div>
              ))
            ) : (
              <p>아직 리뷰가 없습니다.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
