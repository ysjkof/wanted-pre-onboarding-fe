# :: 원티드 프리온보딩 프론트엔드 코스 사전과제

## 프로젝트 소개

원티드에서 진행하는 pre-onboarding 프론트엔드 과정에 지원하기 위한 Instagram Cloning 과제입니다.

# :: 과제 구현 설명

---

## `Login page`

- 아이디와 패스워드에 관한 로그인 컴포넌트를 개발하였습니다.
- ID, PW 는 사전에 주어진 validation의 요구사항에 맞게 개발하였습니다.
- ID, PW가 유효한 형식으로 입력되면, 로그인 버튼 또는 엔터키를 이용하여 로그인 가능하게 하였습니다.
- 로그인 버튼을 누르면, /public/userDB/users.json 을 fetch하여 사용자가 있는지 확인합니다.
- 현재 유효한 사용자명은 id: asdf@asdf.com / pw: asdfASDF1234!@#$ 입니다.
- 유효한 사용자임이 확인되면, DB에 연관되어 저장되어 있는 userName을 loggedInUser라는 키로 localStorage에 저장합니다.
- useNavigate() 훅을 이용하여 메인 피드 화면으로 라우팅 되어있는 /main 으로 이동합니다.

## Assignment2 - `GNB`

- 스크롤에 관계 없이 화면 상단에 고정되는 `sticky`를 사용하였습니다.
- 모바일 사이즈는 Instagram 실제 웹사이트와 같이 로고와 profile icon 을 제외한 나머지 메뉴 아이콘들을 position: fixed로 재정의 하여 하단으로 가게 하였습니다. (PC 와 모바일 앱의 기능이 다르지 않아 따로 컴포넌트를 분리하지 않고 단순히 css로 위치만 이동하게끔 구현 하였습니다.)
- Logout은 프로필 아이콘을 클릭하면 나타나는 드롭다운 메뉴에 배치 하였습니다.

## Assignment3 - `Validation`

- 이메일과 비밀번호의 유효성을 정규식을 사용하여 validation 합니다.
- 유효하지 않은 이메일 또는 비밀번호 형식일 경우 보더가 붉은색으로 변경 및 하단에 '유효하지 않은 형식입니다.'가 출력됩니다.
- 유효하지 않은 형식일 경우 로그인 버튼이 옅은색으로 유지되며 클릭 또는 엔터를 입력하여도 반응하지 않습니다.
- 유효한 형식으로 로그인을 시도하였으나 사용자를 찾을 수 없는 경우 alert창으로 사용자를 찾을 수 없음을 통지합니다.

## Assignment4 - `Routing`

- 라우팅은 react-router v6를 사용하였습니다.
- main page를 Protected Route 으로 래핑하여 localStorage에 로그인 정보가 저장되어 있을 경우만 접근할 수 있도록 하였습니다.

## Assignment5 - `Feeds`

- Main Feed Page 에는 /public/data/feed.json 의 게시물들이 fetch되어 렌더링 됩니다.
- 각각의 Feed에 댓글을 추가할 수 있습니다. (Enter key & 클릭으로 게시 가능)
- 프론트엔드만 구현되어 있기 때문에 추가된 댓글은 탭을 닫으면 사라집니다.
- Feed Image는 아래의 url을 사용하였습니다. 각기 다른 사이즈의 이미지는 Instagram 웹사이트와 비슷하게 가로만 맞추고, 세로는 max-height: 30rem(480px)으로 지정하였습니다.(css에는 추후 추가적인 반응형을 고려해 rem으로 통일 하였습니다. 현재 html의 font-size는 기본인 16px)

  "[https://source.unsplash.com/random/600x500](https://source.unsplash.com/random/600x500)"
  "[https://source.unsplash.com/random/900x500](https://source.unsplash.com/random/900x500)"
  "[https://source.unsplash.com/random/700x1080](https://source.unsplash.com/random/700x1080)"

- Feeds의 Image가 로딩된 후 컴포넌트가 로딩 되도록 Loading을 구현 하였습니다. 각 포스팅의 컴포넌트의 image tag의 onload에 로딩이 완료되면 ref변수의 해당 key에 true로 등록하게 하였고, 등록 시마다 모두가 로딩되어 있는지를 저장하는 state변수를 체크하여, 모두가 등록 완료된 경우 전체를 덮고 있는 베일 요소를 사라지게 하였습니다.
- 하지만 이 방식에도 불구하고 베일 요소가 사라져도 포스팅들의 렌더링이 진행되고 있는 현상이 계속 되어 추가적인 연구가 필요한 부분입니다.
