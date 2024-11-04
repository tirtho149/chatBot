async function processFile(endpoint, fileInputId, outputId) {
  const fileInput = document.getElementById(fileInputId);
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      document.getElementById(outputId).textContent = result.message;
    } else {
      document.getElementById(outputId).textContent = 'Error processing file';
    }
  } catch (error) {
    console.error(error);
    alert(`Error processing ${outputId}`);
  }
}

// Individual functions for each processing action
async function processSavingToNPZ() {
  await processFile('/api/saving-to-npz', 'savingFile', 'savingOutput');
}

async function processQualityCheck() {
  await processFile('/api/quality-check', 'qualityFile', 'qualityOutput');
}

async function processStacking() {
  await processFile('/api/stacking', 'stackFile1', 'stackOutput');
}

async function processCalendarConversion() {
  await processFile('/api/calendar-conversion', 'calendarFile', 'calendarOutput');
}

async function processUnitConversion() {
  await processFile('/api/unit-conversion', 'unitFile', 'unitOutput');
}

async function processTemporalAggregation() {
  await processFile('/api/temporal-aggregation', 'temporalFile', 'temporalOutput');
}

async function processCropping() {
  await processFile('/api/cropping', 'cropFile', 'cropOutput');
}



async function processSlicing() {
  await processFile('/api/slicing', 'slicingFile', 'slicingOutput');
}

async function processStatistics() {
  await processFile('/api/statistics', 'statisticsFile', 'statisticsOutput');
}

async function processPlot() {
  await processFile('/api/plot', 'plotFile', 'plotOutput');
}

async function processAnimation() {
  await processFile('/api/animation', 'animationFile', 'animationOutput');
}

async function processTiffToNPZ() {
  await processFile('/api/tiff-to-npz', 'tiffFile', 'tiffOutput');
}

async function processBiasCorrection() {
  await processFile('/api/bias-correction', 'biasFile', 'biasOutput');
}

async function processDownscaling() {
  await processFile('/api/downscaling', 'downscaleFile', 'downscaleOutput');
}
```

---

### 4. `app.py` (Flask Backend)

This Python Flask backend handles each endpoint, executes the associated Bash script, and returns the result to the frontend.

```python
from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

# Helper function to run bash commands
def run_bash_command(command):
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            return {"message": result.stdout}
        else:
            return {"message": f"Error: {result.stderr}"}
    except Exception as e:
        return {"message": f"Exception occurred: {str(e)}"}

# Define endpoints for each function
@app.route('/api/saving-to-npz', methods=['POST'])
def saving_to_npz():
    file = request.files['file']
    file.save("temp.nc")
    return jsonify(run_bash_command("bash saving_to_npz.sh temp.nc"))

@app.route('/api/quality-check', methods=['POST'])
def quality_check():
    file = request.files['file']
    file.save("temp.npz")
    return jsonify(run_bash_command("bash quality_check.sh temp.npz"))

@app.route('/api/stacking', methods=['POST'])
def stacking():
    file = request.files['file']
    file.save("temp_stack.npz")
    return jsonify(run_bash_command("bash stacking.sh temp_stack.npz"))

@app.route('/api/calendar-conversion', methods=['POST'])
def calendar_conversion():
    file = request.files['file']
    file.save("temp_calendar.npz")
    return jsonify(run_bash_command("bash calendar_conversion.sh temp_calendar.npz"))

@app.route('/api/unit-conversion', methods=['POST'])
def unit_conversion():
    file = request.files['file']
    file.save("temp_unit.npz")
    return jsonify(run_bash_command("bash unit_conversion.sh temp_unit.npz"))

@app.route('/api/temporal-aggregation', methods=['POST'])
def temporal_aggregation():
    file = request.files['file']
    file.save("temp_temporal.npz")
    return jsonify(run_bash_command("bash temporal_aggregation.sh temp_temporal.npz"))

@app.route('/api/cropping', methods=['POST'])
def cropping():
    file = request.files['file']
    file.save("temp_crop.npz")
    return jsonify(run_bash_command("bash cropping.sh temp_crop.npz"))

@app.route('/api/slicing', methods=['POST'])
def slicing():
    file = request.files['file']
    file.save("temp_slicing.npz")
    return jsonify(run_bash_command("bash slicing.sh temp_slicing.npz"))

@app.route('/api/statistics', methods=['POST'])
def statistics():
    file = request.files['file']
    file.save("temp_statistics.npz")
    return jsonify(run_bash_command("bash statistics.sh temp_statistics.npz"))

@app.route('/api/plot', methods=['POST'])
def plot():
    file = request.files['file']
    file.save("temp_plot.npz")
    return jsonify(run_bash_command("bash plot.sh temp_plot.npz"))

@app.route('/api/animation', methods=['POST'])
def animation():
    file = request.files['file']
    file.save("temp_animation.npz")
    return jsonify(run_bash_command("bash animation.sh temp_animation.npz"))

@app.route('/api/tiff-to-npz', methods=['POST'])
def tiff_to_npz():
    file = request.files['file']
    file.save("temp.tiff")
    return jsonify(run_bash_command("bash tiff_to_npz.sh temp.tiff"))

@app.route('/api/bias-correction', methods=['POST'])
def bias_correction():
    file = request.files['file']
    file.save("temp_bias.npz")
    return jsonify(run_bash_command("bash bias_correction.sh temp_bias.npz"))

@app.route('/api/downscaling', methods=['POST'])
def downscaling():
    file = request.files['file']
    file.save("temp_downscale.npz")
    return jsonify(run_bash_command("bash downscaling.sh temp_downscale.npz"))

if __name__ == '__main__':
    app.run(debug=True)
