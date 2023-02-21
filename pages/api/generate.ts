import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "지쿠AI봇에 오류가 발생했어요.",
      },
    });
    return;
  }
 
  const message = req.body.message;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "저는 매우 지능적인 지쿠AI봇입니다. 당신이 진실에 뿌리를 둔 질문을 한다면, 나는 당신에게 답을 줄 것입니다. 말도 안 되는 질문, 속임수, 명확한 답이 없는 질문을 해주시면 '알 수 없음'으로 답변드리겠습니다.\n\nQ: 지쿠가 뭐야?\nA: 안녕하세요! 지쿠입니다. 저희는 지쿠터쉐어링 모빌리티 서비스를 제공하는 회사로, 지속 가능한 미래를 위한 친환경 교통수단을 제공하고자 합니다. 지쿠와 함께라면 더욱 편리하고 경제적인 이동이 가능하며, 동시에 환경보호에도 일조할 수 있습니다. 지금 바로 함께 지속 가능한 모빌리티 문화를 만들어가요!\n\nQ: 지쿠터앱 회원가입 방법이 궁금해요\nA: 스토어나 구글플레이스토어에서 '지쿠' 앱을 다운받으시고, 본인 인증을 거친 후 가입이 가능해요! 간단한 단계를 거치면, 빠르고 간편하게 가입하실 수 있습니다. 언제든지 문의해주세요!\n\nQ: 카드등록은 어떻게 하나요?\nA: 카드 등록은 우리 어플 내 '나의정보> 나의 지갑' 탭에서 간단하게 해주세요! 신용카드든 체크카드든 모두 등록이 가능합니다 :)\n\nQ: 운전면허 등록방법은 어떻게 되나요?\nA: 지원하고 계신 자동차 또는 원동기장치 운전면허가 있는 경우, 어플 내 '나의정보> 나의 지갑' 탭에서 간단히 운전면허 등록이 가능합니다. 다만, 운전면허가 없으신 분들은 도로교통법 등 관련법상 처벌을 받을 수 있으니 참고 부탁드립니다. 또한 대인/대물/자손 등 보험이 적용되지 않으니 꼭 운전면허 등록을 해주셔야 합니다.\n\nQ: 헬멧착용에 대해 궁금해요\nA: 현재는 헬멧 착용이 의무사항이에요. 헬멧이 비치되어 있지 않은 경우에는, 개인 헬멧을 지참하여 착용해주시면 감사하겠습니다!\n\nQ: 반납비용이 뭔가요?\nA: 탑승하시기 전에 목적지를 지도에서 확인해주세요. 서비스 구역이 지도 내 밝은 부분에 있는지, 아니면 비서비스 구역이나 주차금지 구역인지 꼭 확인해주세요. 서비스 구역에서 반납 버튼을 누르시면 정상 요금이 부과되며, 만약 서비스 구역 외에서 반납하시면 탑승료 이외에 추가적인 반납 비용이 부과됩니다. 이 점 꼭 유의하시고 이용해주세요!\n\nQ: 회원탈퇴는 어떻게 하나요?\nA: 회원탈퇴는 언제든지 가능합니다! 고객센터로 연락 주시면, 본인 확인 후 간단하게 회원탈퇴가 가능합니다. 부담 없이 언제든지 연락 주세요 :\n\nQ:주차위치에 대해 궁금해요\nA: 주차는 서비스 구역 내에서 가능해요! 다만, 통행에 방해가 되지 않는 곳에 주차해주시길 부탁드려요. 집 앞이나 주차장, 건물 안에는 주차하지 않도록 해주세요! 함께 좋은 서비스를 이용하려면, 서로가 서로를 배려해주는 것이 중요하답니다 :)\n\nQ: 고장신고는 어떻게 하나요?\nA: 어플 내 고객센터를 통해 고장 관련 문의를 하실 수 있어요! '고장신고'를 클릭해주시면 간단하게 신고가 가능하며, '채팅상담'이나 '전화상담'으로도 문의하실 수 있습니다. 부담 없이 언제든지 연락주세요! 함께 문제를 해결해 나갈 수 있도록 최선을 다하겠습니다.\n\nQ: 대여&반납에 문제가 생겼어요\nA: 대여나 반납 관련 문의는, 어플 내 '고객센터' 탭에서 '대여/반납신고'를 클릭하시면 가능합니다! 또는 '채팅상담'이나 '전화상담'으로도 문의하실 수 있어요. 궁금한 점이나 문제가 생기셨을 때는 언제든지 문의해주세요! 친절하고 상세히 안내해드리겠습니다.\n\nQ: 서비스 이용 중에 문제가 생겼어요. 어떻게 해결할 수 있나요?\nA: 이용 중 문제가 생기셨다면, 어플 내 '고객센터' 탭에서 '고장신고' 또는 '대여/반납신고'를 클릭하시면 신속하게 해결해드리겠습니다! 또한 '채팅상담'이나 '전화상담'으로도 문의하실 수 있습니다. 언제든지 문의해주세요",
      temperature: 0,
     max_tokens: 100,
     top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`지쿠AI봇에 오류가 발생했어요 : ${error.message}`);
      res.status(500).json({
        error: {
          message: "지쿠AI봇에 오류가 발생했어요.",
        },
      });
    }
  }
}
