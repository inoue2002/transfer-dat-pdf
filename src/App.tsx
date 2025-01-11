import './App.css';

function App() {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = document.getElementById('fileName') as HTMLDivElement;
    fileName.textContent = `選択されたファイル: ${file.name}`;

    const reader = new FileReader();

    reader.onload = function (e) {
      if (!e.target?.result) return;

      // ファイルが読み込まれたら自動的にPDFに変換してダウンロード
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([e.target.result]));
      link.download = file.name.replace('.dat', '.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="container">
      <h1>DATファイルをPDFに変換</h1>

      <div className="file-upload">
        <input type="file" id="fileInput" accept=".dat" onChange={handleFileChange} style={{ display: 'none' }} />
        <label
          htmlFor="fileInput"
          className="upload-btn"
          style={{
            padding: '10px 20px',
            background: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          ファイルを選択
        </label>
      </div>

      <div id="fileName"></div>
    </div>
  );
}

export default App;
