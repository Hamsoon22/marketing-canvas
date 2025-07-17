import React, { useContext } from 'react';
import { Container, Typography, TextField, Box, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MarketingContext } from './MarketingContext';

export default function App() {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(MarketingContext);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleProductChange = (index, value) => {
    const updated = [...formData.productIdeas];
    updated[index] = value;
    handleChange('productIdeas', updated);
  };

  const handleCustomerChange = (index, key, value) => {
    const updated = [...formData.customers];
    updated[index][key] = value;
    handleChange('customers', updated);
  };

  const handleValuesChange = (index, value) => {
    const updated = [...formData.values];
    updated[index] = value;
    handleChange('values', updated);
  };

  const calculateBEP = () => {
    const income = parseFloat(formData.incomePerFan || '0');
    const goal = parseFloat(formData.monthlyGoal || '0');
    return income > 0 ? Math.ceil(goal / income) : '-';
  };

  const handleViewCanvas = () => {
    localStorage.setItem('marketingCanvasData', JSON.stringify({ ...formData, bep: calculateBEP() }));
    navigate('/canvas');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Marketing Canvas Web App (MVP)</Typography>

      <Box sx={{ mb: 4, p: 2, backgroundColor: '#f1f1f1', borderRadius: 2 }}>
        <Typography variant="body1" gutterBottom>
          이 캔버스는 KLON의 마케팅 프레임워크 기반으로 구성되었습니다. 회사(Company), 고객(Target), 가치(Value), 행동(Action)의 요소들을 하나의 그림으로 연결하여<br/>
          '내가 왜 이 사업을 하려는지', '고객은 누구인지', '어떤 가치를 주는지'를 명확히 정리해줍니다. <br/><br/>
          왼쪽은 회사의 미션/비전/제품 중심, 오른쪽은 고객과 그들의 니즈, 아래는 그들이 얻는 가치와 상호작용 흐름으로 구성되어 있으며,<br/>
          최종적으로 이 모든 요소가 자연스럽게 이어지도록 하는 '문장 생성(④)'을 통해 사업 메시지를 도출할 수 있습니다.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* 왼쪽 컬럼 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">① 기본 정보</Typography>
            <TextField fullWidth margin="normal" label="이름" value={formData.name} onChange={e => handleChange('name', e.target.value)} />
            <TextField fullWidth margin="normal" label="브랜드명 / 회사명" value={formData.bizName} onChange={e => handleChange('bizName', e.target.value)} />

            <Typography variant="h6" sx={{ mt: 4 }}>① 하고 싶은 일</Typography>
            {formData.productIdeas.map((p, i) => (
              <TextField key={i} fullWidth margin="dense" label={`아이디어 ${i + 1}`} value={p} onChange={e => handleProductChange(i, e.target.value)} />
            ))}

            <Typography variant="h6" sx={{ mt: 4 }}>③ 가치 및 비전</Typography>
            {formData.values.map((v, i) => (
              <TextField key={i} fullWidth margin="dense" label={`사람은 ○○해야 한다 (${i + 1})`} value={v} onChange={e => handleValuesChange(i, e.target.value)} />
            ))}
            <TextField fullWidth margin="normal" label="내가 만들고 싶은 세상 (비전)" value={formData.vision} onChange={e => handleChange('vision', e.target.value)} />
            <TextField fullWidth margin="normal" label="핵심 가치 (1단어)" value={formData.coreValue} onChange={e => handleChange('coreValue', e.target.value)} />

            <Typography variant="h6" sx={{ mt: 4 }}>④ 마케팅 문장</Typography>
            <TextField fullWidth margin="normal" multiline rows={2} value={formData.marketingPhrase} onChange={e => handleChange('marketingPhrase', e.target.value)} />
          </Paper>
        </Grid>

        {/* 오른쪽 컬럼 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">② 고객 정의</Typography>
            {formData.customers.map((c, i) => (
              <Paper key={i} sx={{ p: 2, mb: 2, backgroundColor: '#f9f9f9' }}>
                <Typography variant="subtitle1">고객 {i + 1}</Typography>
                <TextField fullWidth margin="dense" label="이름" value={c.name} onChange={e => handleCustomerChange(i, 'name', e.target.value)} />
                <TextField fullWidth margin="dense" label="나이" value={c.age} onChange={e => handleCustomerChange(i, 'age', e.target.value)} />
                <TextField fullWidth margin="dense" label="직업" value={c.job} onChange={e => handleCustomerChange(i, 'job', e.target.value)} />
                <TextField fullWidth margin="dense" label="원하는 것 (키워드)" value={c.desire} onChange={e => handleCustomerChange(i, 'desire', e.target.value)} />
              </Paper>
            ))}

            <Typography variant="h6" sx={{ mt: 4 }}>⑤ 고객 경험 설계</Typography>
            <TextField fullWidth margin="normal" multiline label="경험 장면 설명" rows={2} value={formData.experienceScene} onChange={e => handleChange('experienceScene', e.target.value)} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth margin="normal" label="소요 시간 (분)" value={formData.timeRequired} onChange={e => handleChange('timeRequired', e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth margin="normal" label="경험 반복 주기 (예: 매월)" value={formData.frequency} onChange={e => handleChange('frequency', e.target.value)} />
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ mt: 4 }}>⑥ 수익 목표 및 BEP 계산</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth margin="normal" label="단골당 수익액 (원)" value={formData.incomePerFan} onChange={e => handleChange('incomePerFan', e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth margin="normal" label="월 목표 수익 (원)" value={formData.monthlyGoal} onChange={e => handleChange('monthlyGoal', e.target.value)} />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">📈 월간 손익분기점(BEP) 단골 수: <strong>{calculateBEP()}</strong>명</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" size="large" color="primary" onClick={handleViewCanvas}>
          요약 보기 →
        </Button>
      </Box>
    </Container>
  );
}
