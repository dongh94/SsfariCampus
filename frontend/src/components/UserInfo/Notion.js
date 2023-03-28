// css
import styles from "./css/Notion.module.css";

const Notion = () => {
  return (
    <div className={styles.notion}>
      <div className={styles.notionbox}>
        <div>
          <h1>지갑생성방법</h1>
          <h2>step1. + 버튼을 통해 MetaMask.io 접속 </h2>
          <h2>step2. MetaMask Chrome 확장 프로그램 설치</h2>
          <h2>step3. MetaMask 지갑 생성</h2>
          <h1>지갑 생성 시 알아두세요!</h1>
          <h2>1. 지갑 비밀키를 잃어버리지 마세요!</h2>
          <p>한 번 잃어버리면 복구 할 수 없습니다.</p>
          <h2>2. 공유하지 마세요!</h2>
          <p>
            비밀키가 악위적인 사이트에 노출되면 당신의 자산이 유실될 수
            있습니다.
          </p>
          <h2>3. 백업을 만들어 두세요!</h2>
          <p>종이에 적어서 오프라인으로 관리하세요.</p>
        </div>
        <h1>위 사항을 어길 시 본 사이트는 책임지지 않습니다.</h1>
      </div>
    </div>
  );
};
export default Notion;
