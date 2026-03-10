import { useState, useEffect } from 'react';
import { Zap, RefreshCw, Target, BookOpen, MonitorPlay, HeartPulse, Users, CheckCircle2, Flame, MessageSquare, Info, Copy, Check } from 'lucide-react';

export default function App() {
  const [currentDate, setCurrentDate] = useState('');
  const [profile, setProfile] = useState({ name: '', rank: '' });
  const [inputs, setInputs] = useState({
    reading: { checked: false, detail: '' },
    vod: { checked: false, detail: '' },
    product: { checked: false, detail: '' },
    system: { checked: false, detail: '' },
  });
  const [outputs, setOutputs] = useState({
    contact: '',
    stp: '',
    followup: '',
    invite: '',
  });
  const [journal, setJournal] = useState({
    goodNews: '',
    goodPoint: '',
    badPoint: '',
    question: '',
    tomorrow: '',
  });
  
  const [toast, setToast] = useState({ show: false, message: '', isError: false });

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    setCurrentDate(formattedDate);
  }, []);

  const showToast = (message: string, isError = false) => {
    setToast({ show: true, message, isError });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const fillDemoData = () => {
    setProfile({ name: '김성장', rank: '빌더' });
    setInputs({
      reading: { checked: true, detail: '하우투 네트워크마케팅 2챕터' },
      vod: { checked: true, detail: '본사 보상플랜 마스터 강의' },
      product: { checked: true, detail: '아침 헬스팩, 뉴트리밀 섭취' },
      system: { checked: true, detail: '팀 저녁 줌미팅 참석' },
    });
    setOutputs({
      contact: '직장 동료 A에게 안부 카톡 후 주말 약속 잡음',
      stp: '친구 B에게 3분 마이스토리 후 리셋 프로그램 제안',
      followup: '지난주 가입한 C고객 호전반응 체크 (어지러움 증상 선제적 안내)',
      invite: 'D가망사업자 토요일 세미나 초대 멘트 전송 (거절당함)',
    });
    setJournal({
      goodNews: '오랫동안 거절하던 지인이 헬스팩을 먹어보겠다고 마음을 열었습니다!',
      goodPoint: '두려웠지만 D에게 당당하게 비즈니스를 제안해 본 것',
      badPoint: 'D가 다단계라며 거절했을 때, 스무스하게 화제 전환을 못하고 당황함',
      question: '강하게 선입견을 가진 지인에게는 다음 번에 어떤 방식으로 정보를 투척하며 관계를 이어가는게 좋을까요?',
      tomorrow: '내일은 C고객을 만나서 올바른 섭취법을 직접 다시 보여주겠습니다!',
    });
    showToast('💡 예시 데이터가 채워졌습니다.');
  };

  const generateShareText = () => {
    return `[🔥 유사나 퀀텀점프 GO-GETTER 인증 일지 🔥]\n\n👤 이름/직급: ${profile.name || 'OOO'} / ${profile.rank || 'OOO'}\n📅 날짜: ${currentDate}\n\n✅ 1. 오늘의 기본기 인증\n* 📖 독서: ${inputs.reading.checked ? '완료' : '미완료'} ${inputs.reading.detail ? `(${inputs.reading.detail})` : ''}\n* 🎧 VOD: ${inputs.vod.checked ? '완료' : '미완료'} ${inputs.vod.detail ? `(${inputs.vod.detail})` : ''}\n* 💊 제품애용: ${inputs.product.checked ? '완료' : '미완료'} ${inputs.product.detail ? `(${inputs.product.detail})` : ''}\n* 👥 시스템참석: ${inputs.system.checked ? '완료' : '미완료'} ${inputs.system.detail ? `(${inputs.system.detail})` : ''}\n\n✅ 2. 오늘의 필드 액션\n* 컨택&신뢰쌓기: ${outputs.contact || '없음'}\n* 제품전달&STP: ${outputs.stp || '없음'}\n* 소비자 후속관리: ${outputs.followup || '없음'}\n* 초대&비전미팅: ${outputs.invite || '없음'}\n\n✅ 3. 오늘의 굿뉴스 📢\n* ${journal.goodNews || '없음'}\n\n✅ 4. 오늘의 도전 일지 및 질문 💡\n* 잘한 점: ${journal.goodPoint || '없음'}\n* 아쉬운 점(거절): ${journal.badPoint || '없음'}\n* 스폰서님께 질문: ${journal.question || '없음'}\n\n🔥 내일의 다짐: ${journal.tomorrow || '없음'}`;
  };

  const copyToClipboard = async () => {
    const text = generateShareText();
    try {
      await navigator.clipboard.writeText(text);
      showToast('✅ 양식이 클립보드에 복사되었습니다. 팀 단톡방에 붙여넣기 하세요!');
    } catch (err) {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showToast('✅ 양식이 클립보드에 복사되었습니다. 팀 단톡방에 붙여넣기 하세요!');
      } catch (e) {
        showToast('❌ 복사에 실패했습니다. 직접 드래그해서 복사해주세요.', true);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-24 font-sans selection:bg-blue-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-5 shadow-md sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400 fill-current" />
              유사나 퀀텀점프 GO-GETTER
            </h1>
            <p className="text-blue-200 text-sm mt-1">{currentDate} 실전 일지</p>
          </div>
          <button onClick={fillDemoData} className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> 예시 채우기
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-6 mt-4 sm:mt-8">
        {/* Profile Section */}
        <section className="bg-white rounded-2xl shadow-sm p-5 border border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-500 mb-2">이름</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                placeholder="홍길동" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 transition-colors outline-none" 
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-500 mb-2">직급 (목표직급)</label>
              <input 
                type="text" 
                value={profile.rank}
                onChange={(e) => setProfile({...profile, rank: e.target.value})}
                placeholder="골드 디렉터" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 transition-colors outline-none" 
              />
            </div>
          </div>
        </section>

        {/* 1. Input Section */}
        <section className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-slate-800">1. 비즈니스 오너의 기본기 (Input)</h2>
          </div>
          <div className="p-4 space-y-5">
            {/* Reading */}
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setInputs({...inputs, reading: {...inputs.reading, checked: !inputs.reading.checked}})}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all w-full ${inputs.reading.checked ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                <span>
                  {inputs.reading.checked ? <CheckCircle2 className="w-6 h-6 text-blue-600" /> : <div className="w-6 h-6 rounded-full border-2 border-slate-300"></div>}
                </span>
                <BookOpen className="w-5 h-5" />
                <span className="text-base font-medium flex-1 text-left">독서 15분</span>
              </button>
              <input 
                type="text" 
                value={inputs.reading.detail}
                onChange={(e) => setInputs({...inputs, reading: {...inputs.reading, detail: e.target.value}})}
                placeholder="읽은 책 제목 및 챕터" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>

            {/* VOD */}
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setInputs({...inputs, vod: {...inputs.vod, checked: !inputs.vod.checked}})}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all w-full ${inputs.vod.checked ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                <span>
                  {inputs.vod.checked ? <CheckCircle2 className="w-6 h-6 text-blue-600" /> : <div className="w-6 h-6 rounded-full border-2 border-slate-300"></div>}
                </span>
                <MonitorPlay className="w-5 h-5" />
                <span className="text-base font-medium flex-1 text-left">VOD 시청</span>
              </button>
              <input 
                type="text" 
                value={inputs.vod.detail}
                onChange={(e) => setInputs({...inputs, vod: {...inputs.vod, detail: e.target.value}})}
                placeholder="시청한 강의 제목" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>

            {/* Product */}
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setInputs({...inputs, product: {...inputs.product, checked: !inputs.product.checked}})}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all w-full ${inputs.product.checked ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                <span>
                  {inputs.product.checked ? <CheckCircle2 className="w-6 h-6 text-blue-600" /> : <div className="w-6 h-6 rounded-full border-2 border-slate-300"></div>}
                </span>
                <HeartPulse className="w-5 h-5" />
                <span className="text-base font-medium flex-1 text-left">100% 애용</span>
              </button>
              <input 
                type="text" 
                value={inputs.product.detail}
                onChange={(e) => setInputs({...inputs, product: {...inputs.product, detail: e.target.value}})}
                placeholder="오늘 체험한 제품" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>

            {/* System */}
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setInputs({...inputs, system: {...inputs.system, checked: !inputs.system.checked}})}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all w-full ${inputs.system.checked ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                <span>
                  {inputs.system.checked ? <CheckCircle2 className="w-6 h-6 text-blue-600" /> : <div className="w-6 h-6 rounded-full border-2 border-slate-300"></div>}
                </span>
                <Users className="w-5 h-5" />
                <span className="text-base font-medium flex-1 text-left">시스템 참석</span>
              </button>
              <input 
                type="text" 
                value={inputs.system.detail}
                onChange={(e) => setInputs({...inputs, system: {...inputs.system, detail: e.target.value}})}
                placeholder="참석한 미팅/세미나" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>
        </section>

        {/* 2. Output Section */}
        <section className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-slate-800">2. 현장 실천 행동 (Output)</h2>
            </div>
            <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded-full whitespace-nowrap">5단계 흐름</span>
          </div>
          <div className="p-4 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">🤝 컨택 & 신뢰쌓기</label>
              <input 
                type="text" 
                value={outputs.contact}
                onChange={(e) => setOutputs({...outputs, contact: e.target.value})}
                placeholder="누구에게 어떤 연락/만남을 했나요?" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-orange-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">📢 제품 전달 & STP</label>
              <input 
                type="text" 
                value={outputs.stp}
                onChange={(e) => setOutputs({...outputs, stp: e.target.value})}
                placeholder="마이스토리 공유 및 제안 내용" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-orange-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">💊 소비자 후속관리</label>
              <input 
                type="text" 
                value={outputs.followup}
                onChange={(e) => setOutputs({...outputs, followup: e.target.value})}
                placeholder="호전반응 체크, 복용법 안내 등" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-orange-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">🎯 초대 & 비전미팅</label>
              <input 
                type="text" 
                value={outputs.invite}
                onChange={(e) => setOutputs({...outputs, invite: e.target.value})}
                placeholder="초대 멘트 건넨 사람 및 스폰서 미팅 결과" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-orange-500 outline-none" 
              />
            </div>
          </div>
        </section>

        {/* 3. Journal Section */}
        <section className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-slate-800">3. 성찰 및 스폰서 상담 (Feedback)</h2>
          </div>
          <div className="p-4 space-y-6">
            {/* Good News */}
            <div>
              <label className="block text-base font-bold text-slate-800 mb-2 flex items-center gap-1">
                🎉 오늘의 굿뉴스
              </label>
              <p className="text-sm text-slate-500 mb-3">거절을 극복했거나, 마인드가 긍정적으로 변한 사소한 것도 좋습니다.</p>
              <textarea 
                rows={3} 
                value={journal.goodNews}
                onChange={(e) => setJournal({...journal, goodNews: e.target.value})}
                placeholder="예: 거절만 하던 친구가 드디어 제품을 먹어보겠다고 마음을 열었습니다!" 
                className="w-full bg-indigo-50/30 border border-indigo-100 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-indigo-500 resize-none outline-none"
              ></textarea>
            </div>

            {/* Reflection / Question */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
              <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-1">
                💡 오늘의 도전 일지 (복기)
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">👍 내가 잘한 점 (칭찬)</label>
                  <input 
                    type="text" 
                    value={journal.goodPoint}
                    onChange={(e) => setJournal({...journal, goodPoint: e.target.value})}
                    placeholder="두려웠지만 먼저 돈 이야기를 꺼내 제안한 것" 
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-indigo-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">😅 아쉬운 점 / 현장의 거절</label>
                  <input 
                    type="text" 
                    value={journal.badPoint}
                    onChange={(e) => setJournal({...journal, badPoint: e.target.value})}
                    placeholder="상대방이 거절했을 때 스무스하게 화제 전환을 못한 점" 
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-indigo-500 outline-none" 
                  />
                </div>
                <div className="pt-2">
                  <label className="block text-sm font-bold text-indigo-700 mb-2 flex items-center gap-1">
                    <Info className="w-4 h-4" /> 스폰서님께 묻고 싶은 질문 (핵심!)
                  </label>
                  <textarea 
                    rows={3} 
                    value={journal.question}
                    onChange={(e) => setJournal({...journal, question: e.target.value})}
                    placeholder="예: 강하게 다단계를 거부하는 지인에게 다음엔 어떤 정보를 투척해야 할까요?" 
                    className="w-full border border-indigo-200 bg-white rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-indigo-500 resize-none outline-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-base font-bold text-slate-800 mb-2 flex items-center gap-1">
                🔥 내일의 다짐
              </label>
              <input 
                type="text" 
                value={journal.tomorrow}
                onChange={(e) => setJournal({...journal, tomorrow: e.target.value})}
                placeholder="내일은 꼭 OOO을 세미나에 초대하겠습니다!" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
          </div>
        </section>

      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button 
            onClick={copyToClipboard} 
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md"
          >
            <Copy className="w-5 h-5" />
            단톡방 공유 양식 복사하기
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 animate-bounce text-sm w-max max-w-[90vw]">
          {!toast.isError && <Check className="w-4 h-4 text-green-400" />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
