export default () => ({
    ENVIRONMENT: process.env.ENVIRONMENT, // Nestjs에서는 NODE_ENV에 대해 설정해주지 않으면 undefined로 뜬다
})