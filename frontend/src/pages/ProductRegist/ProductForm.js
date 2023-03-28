// packages
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// utils
import useEth from "../../contexts/EthContext/useEth";
import { storage } from "../../index.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// css
import "./css/ProductForm.css";
import MKBtn from "../../components/ui/MKBtn";
import ModalA from "../../components/ui/ModalA";
// assets
import CoolDeal from "../../assets/cool_deal.gif";

const ProductForm = () => {
  // 모달
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const {
    state: { contract, accounts },
  } = useEth();
  const [inputTitle, setInputTitle] = useState(""); // 상품명
  const [inputLineInfo, setInputLineInfo] = useState(""); // 한 줄 설명
  const [inputPrice, setInputPrice] = useState(""); // 상품 가격
  const [inputCategori, setInputCategori] = useState(""); // 카테고리
  const [inputThumbnail, setInputThumbnail] = useState(""); // 썸네일 사진
  const [inputDetail, setInputDetail] = useState(""); // 상세 사진
  const [inputExpressDue, setInputExpressDue] = useState(""); // 배송 기간
  const [inputInfo, setInputInfo] = useState(""); // 상품 설명

  const navigate = useNavigate();
  const inputSellerName = useSelector((state) => state.user.name);

  // 파이어베이스
  const [tfileList, setTFileList] = useState([]); // 썸네일 파일 리스트
  const [dfileList, setDFileList] = useState([]); // 상세사진 파일 리스트

  const [showThumbnail, setShowThumbnail] = useState([]);

  // 섬네일
  const handleAddThumbnails = (event) => {
    for (const image of event.target.files) {
      setTFileList((prevState) => [...prevState, image]);
    }
    const imageLists = event.target.files;

    let imageUrlLists = [...showImages];
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }
    setInputThumbnail(event.target.value);
    setShowThumbnail(imageUrlLists);
  };

  const [showImages, setShowImages] = useState([]);

  const handleTitleChange = (e) => {
    setInputTitle(e.target.value);
  };
  const handleLineInfoChange = (e) => {
    setInputLineInfo(e.target.value);
  };
  const handlePriceChange = (e) => {
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, "");
    setInputPrice(onlyNumber);
  };
  const handleExpressDueChange = (e) => {
    setInputExpressDue(e.target.value);
  };
  const handleInfoChange = (e) => {
    setInputInfo(e.target.value);
  };

  // 상세 이미지
  const handleAddDetailImages = (event) => {
    for (const image of event.target.files) {
      setDFileList((prevState) => [...prevState, image]);
    }
    const imageLists = event.target.files;

    let imageUrlLists = [...showImages];
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }
    setInputDetail(event.target.value);
    setShowImages(imageUrlLists);
  };

  const registItem = async (e) => {
    e.preventDefault();

    if (
      inputTitle === "" ||
      inputLineInfo === "" ||
      inputPrice === "" ||
      inputCategori === "" ||
      inputThumbnail === "" ||
      inputDetail === "" ||
      inputExpressDue === "" ||
      inputInfo === ""
    ) {
      alert("모든 입력 칸을 채워주세요");
      return;
    }

    let d = ""; // 상세이미지 전달 변수
    let t = ""; // 썸네일 전달 변수
    try {
      // 업로드의 순서는 상관없으니 Promise.all로 이미지 업로드후 저장된 url 받아오기
      const tUrls = Promise.resolve(
        tfileList?.map(async (file) => {
          const storageRef = ref(
            storage,
            `thumbnails/${accounts[0]}/${inputLineInfo}`
          );
          await uploadBytesResumable(storageRef, file);
          return getDownloadURL(storageRef);
        })
      );
      const dUrls = Promise.resolve(
        dfileList?.map(async (file) => {
          const storageRef = ref(
            storage,
            `detailImages/${accounts[0]}/${inputLineInfo}`
          );
          await uploadBytesResumable(storageRef, file);
          return getDownloadURL(storageRef);
        })
      );
      // 업로드된 이미지 링크 상태로 지정 (보통은 해당 링크를 데이터베이스(파이어스토어)에 저장)
      const getData = () => {
        openModal();
        window.scrollTo({ top: 0, behavior: "smooth" });
        try {
          tUrls.then((tData) => {
            tData[tData.length - 1]
              .then((tUrlData) => {
                t = tUrlData;
              })
              .then(() => {
                dUrls.then((dData) => {
                  dData[dData.length - 1]
                    .then((dUrlData) => {
                      d = dUrlData;
                    })
                    .then(async () => {
                      const title = inputTitle;
                      const lineInfo = inputLineInfo;
                      const price = parseInt(inputPrice);
                      const categori = inputCategori;
                      const thumbnail = t;
                      const detail = d;
                      const expressDue = inputExpressDue;
                      const info = inputInfo;
                      const sellerName = inputSellerName;
                      await contract.methods
                        .registerItem(
                          title,
                          lineInfo,
                          price,
                          categori,
                          thumbnail,
                          detail,
                          expressDue,
                          info,
                          accounts[0],
                          sellerName
                        )
                        .send({ from: accounts[0], gas: 5020400 });
                    })
                    .then(async () => {
                      const itemNo = await contract.methods.viewItemNo().call();
                      navigate("/products/" + itemNo);
                    });
                });
              });
          });
        } catch {
          closeModal();
        }
      };
      getData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeSelect = (e) => {
    setInputCategori(e.target.value);
    setSelected(e.target.value);
  };
  const options = [
    { value: "", text: "카테고리를 선택해주세요" },
    { value: "의류", text: "의류" },
    { value: "식품", text: "식품" },
    { value: "잡화", text: "잡화" },
  ];
  const [selected, setSelected] = useState(options[0].value);
  return (
    <form className="product_inputgroup">
      <label>상품명</label>
      <input
        placeholder="상품명을 입력해주세요"
        value={inputTitle}
        onChange={handleTitleChange}
      />
      <br />
      <label>한 줄 설명</label>
      <input
        placeholder="한 줄 설명을 입력해주세요"
        value={inputLineInfo}
        onChange={handleLineInfoChange}
      />
      <br />
      <label>상품 가격</label>
      <input
        placeholder="상품 가격을 입력해주세요"
        value={inputPrice}
        onChange={handlePriceChange}
      />
      <br />
      <label>카테고리</label>
      <select
        name="카테고리"
        id=""
        onChange={handleChangeSelect}
        value={selected}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <br />
      <label>썸네일 사진</label>
      <input
        type="file"
        multiple
        onChange={handleAddThumbnails}
        value={inputThumbnail}
      />
      {showThumbnail.map((image, id) => (
        <div key={id}>
          <img src={image} alt={`${image}-${id}`} className="thumbnail_img" />
        </div>
      ))}
      <br />
      <label>상세 사진</label>
      <input
        type="file"
        multiple
        onChange={handleAddDetailImages}
        value={inputDetail}
      />
      {showImages.map((image, id) => (
        <div key={id}>
          <img src={image} alt={`${image}-${id}`} className="detail_img" />
        </div>
      ))}
      <br />
      <label>배송 기간</label>
      <input
        placeholder="배송 기간을 입력해주세요"
        value={inputExpressDue}
        onChange={handleExpressDueChange}
      />
      <br />
      <label className="product_summary">상품 설명</label>
      <textarea
        placeholder="상품 설명을 입력해주세요"
        value={inputInfo}
        onChange={handleInfoChange}
      />
      <br />
      <div className="button_position">
        <MKBtn onClick={registItem}>등록하기</MKBtn>
      </div>
      <ModalA open={modalOpen}>
        <img src={CoolDeal} alt="쿨거래" style={{ width: "200px" }} />
        <div>
          <p>상품등록 중입니다</p>
          <p>잠시만 기다려주세요</p>
        </div>
      </ModalA>
    </form>
  );
};

export default ProductForm;
