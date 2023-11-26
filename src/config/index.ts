import { ConfigModule } from "@nestjs/config";
import configuration from "./configuration";

export default ({} = {}) => ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.local`, // 배포되는 환경마다 env파일을 다르게 가지고 와야 하는경우,  // NODE_ENV는 설정해주지 않으면 undefined로 뜬다
    load: [configuration],
});