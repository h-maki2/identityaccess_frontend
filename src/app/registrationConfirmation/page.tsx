'use client'

export default function registrationConfirmationPage() 
{
  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '100px'}}>
        <h4 style={{fontSize: '50px'}}>まだ本登録は完了していません。</h4>
        <h6 style={{fontSize: '30px'}}>先ほど入力したメールアドレス宛に認証済み更新メールを送信しました。</h6>
        <h6 style={{fontSize: '30px'}}>そちらのメールから認証済みに更新を行い、本登録を完了してください。</h6>
      </div>
    </div>
  )
}