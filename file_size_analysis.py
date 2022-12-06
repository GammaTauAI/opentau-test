import os
import sys
import csv
import matplotlib.pyplot as plt

if len(sys.argv) != 2:
    print("Usage: python file_size_analysis.py <results_file>")
    sys.exit(1)

RESULTS_FILE = sys.argv[1]
OUTPUT_DIR = "./charts/"
TEST_DIR = "./js_testfiles/"

FILE_LEN_THRESH = 50

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

def make_graph() -> None:
    with open(RESULTS_FILE, 'r') as f:
        reader = csv.reader(f, delimiter=',')
        next(reader)
        results = {}
        file_set = set()
        for row in reader:
            file, model, lang, strategy, retries, num_comp, temp,  iters, successes, avg_quality = row
            file_set.add(file)

            pre, ext = os.path.splitext(os.path.join(TEST_DIR, file))
            assert ext == ".ts"
            js_file = pre + ".js"
            is_short_file = True
            with open(js_file, 'r') as rf:
                file_len = len(rf.readlines())
                if file_len > FILE_LEN_THRESH:
                    is_short_file = False

            key = (model, lang, strategy, retries, num_comp, temp, iters, is_short_file)
            if key not in results:
                if successes != "0":
                    results[key] = (1, [float(avg_quality)], 0)
                else:
                    results[key] = (0, [], 0)
            elif successes != "0":
                results[key] = (
                    results[key][0] + 1,
                    results[key][1] + [float(avg_quality)],
                    results[key][2] + 1
                )
            else:
                results[key] = (
                    results[key][0],
                    results[key][1],
                    results[key][2] + 1
                )
        
        max_y = len(file_set)
        for key in results:
            if len(results[key][1]) > 0:
                results[key] = (
                    results[key][0],
                    round(sum(results[key][1]) / len(results[key][1]), 2),
                    results[key][2]
                )
            else:
                results[key] = (results[key][0], 0, results[key][2])

        x = []
        y = []
        keys_map = {}
        labels = []
        for key, value in results.items():
            if key[5] == '1':
                continue
            ket_str_pre = "{}-{}".format(key[0], key[2])
            if ket_str_pre not in keys_map:
                keys_map[ket_str_pre] = 0
            else:
                keys_map[ket_str_pre] += 1

            ket_str = "{}-{}-{}-{}".format(key[0], key[2], keys_map[ket_str_pre], "s" if key[-1] else "l")
            x.append(ket_str)
            acc = round((value[0] / value[2]) * 100, 2)
            y.append(acc)
            labels.append(
                "Acc\n{}\nAvg Quality\n{}".format(acc, value[1]))

        fig, ax = plt.subplots()
        color = []
        is_blue = True
        for _ in range(len(x)):
            color += ['cadetblue'] if is_blue else ['orange']
            is_blue = not is_blue
        ax.bar(x, y, color=color)
        ax.set_title("Accuracy per configuration")
        ax.set_xlabel("Config")
        ax.set_ylabel("Proportion of successes (%)")
        # make y axis got up to max_y
        ax.set_ylim(0, max_y)

        # add labels
        for rect, label in zip(ax.patches, labels):
            height = rect.get_height()
            # get the height of the label
            ax.text(rect.get_x() + rect.get_width() / 2, height - (max_y / 5.5), label,
                    ha='center', va='bottom')

        # fig.tight_layout()
        plt.setp(ax.get_xticklabels(), fontsize=8, rotation=30)
        plt.subplots_adjust(bottom=0.15)
        plt.savefig(OUTPUT_DIR + "successes_per_config.png")
        plt.close()

if __name__ == '__main__':
    make_graph()
